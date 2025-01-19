import React, { useRef, useState, useEffect } from "react";
import "./Section.css";

const Section = ({ title, videos, color, onEdit, onDelete }) => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Função para converter links do YouTube para embed
  const getEmbedLink = (url) => {
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  // Movimento automático do carrossel (somente com 8+ vídeos)
  useEffect(() => {
    if (isPaused || videos.length < 8) return;

    const interval = setInterval(() => {
      const track = trackRef.current;
      if (track) {
        const maxScroll = track.scrollWidth / 2;
        if (track.scrollLeft >= maxScroll) {
          track.scrollLeft = 0; // Reinicia o carrossel
        } else {
          track.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, videos.length]);

  // Funções de arrasto manual
  const handleMouseDown = (e) => {
    const track = trackRef.current;

    if (!e.target.closest(".video-item")) return;

    setIsDragging(true);
    setIsPaused(true); // Pausa o movimento automático
    setStartX(e.pageX - track.offsetLeft);
    setScrollLeft(track.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const track = trackRef.current;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);

    // Retoma a animação automática após 3 segundos
    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  return (
    <section
      className={`sectionsIguais ${title.toLowerCase()}Container`}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <h3
        className={`tituloPequeno ${title.toLowerCase()}Titulo`}
        style={{ backgroundColor: color }}
      >
        {title}
      </h3>
      <div
        className="carousel-container"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={(e) => handleMouseDown(e.touches[0])}
        onTouchMove={(e) => handleMouseMove(e.touches[0])}
        onTouchEnd={handleMouseUpOrLeave}
      >
        <div className="carousel-track">
          {videos.map((video, index) => (
            <div key={index} className="video-item">
              {video.videoLink?.includes("youtube.com") || video.videoLink?.includes("youtu.be") ? (
                <iframe
                  className="video"
                  src={getEmbedLink(video.videoLink)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  className="video"
                  controls
                  poster={video.imageLink}
                >
                  <source src={video.videoLink} type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              )}
              <div className="button-container">
                <button
                  className="button btnDeletar"
                  onClick={() => onDelete(video.id)}
                >
                  DELETAR
                </button>
                <button
                  className="button btnEditar"
                  onClick={() => onEdit(video)}
                >
                  EDITAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
