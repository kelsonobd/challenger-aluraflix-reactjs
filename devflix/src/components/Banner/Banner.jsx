import React from "react";
import "./Banner.css";

const Banner = ({ video }) => {
  // Função para obter o link embed do YouTube
  const getEmbedLink = (url) => {
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url; // Retorna o link original se não for do YouTube
  };

  // Define a cor do background com base na categoria
  const getBackgroundColor = (category) => {
    switch (category?.toLowerCase()) {
      case "front-end":
        return "#c76e09"; // Amarelo
      case "back-end":
        return "#006100"; // Verde
      case "mobile":
        return "#1270c3"; // Azul
      default:
        return "#ffffff"; // Branco (categoria padrão)
    }
  };

  return (
    <section
      className="bannerContainer"
      style={{
        backgroundImage: `url(${video.imageLink})`, // Define o background do banner
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bannerContainerItens">
        <h1
          className="titulo"
          style={{ backgroundColor: getBackgroundColor(video.category) }} // Aplica o background dinâmico
        >
          {video.category || "Categoria Padrão"}
        </h1>
        <h2 className="subtitulo">{video.title || "Título Padrão"}</h2>
        <p className="descricao">
          {video.description || "Descrição padrão do vídeo."}
        </p>
      </div>
      {video.videoLink?.includes("youtube.com") || video.videoLink?.includes("youtu.be") ? (
        <iframe
          className="video "
          src={getEmbedLink(video.videoLink)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: "80%",
            height: "50vh", // Ajusta a altura para metade da altura da viewport
            maxHeight: "500px",
            border: "none",
          }}
        ></iframe>
      ) : (
        <video
          controls
          className="video"
          poster={video.imageLink}
          style={{
            width: "100%",
            height: "50vh", // Ajusta a altura para metade da altura da viewport
            objectFit: "cover",
          }}
        >
          <source src={video.videoLink} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
      )}
    </section>
  );
};

export default Banner;
