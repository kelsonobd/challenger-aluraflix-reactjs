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
        <h1 className="titulo">{video.category || "Categoria Padrão"}</h1>
        <h2 className="subtitulo">{video.title || "Título Padrão"}</h2>
        <p className="descricao">
          {video.description || "Descrição padrão do vídeo."}
        </p>
      </div>
      {video.videoLink?.includes("youtube.com") || video.videoLink?.includes("youtu.be") ? (
        <iframe
          className="video"
          src={getEmbedLink(video.videoLink)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%", // Largura do vídeo
            height: "400px", // Altura ajustável do vídeo
            borderRadius: "8px", // Opcional: arredonda as bordas
            border: "none", // Remove a borda do iframe
          }}
        ></iframe>
      ) : (
        <video
          controls
          className="video"
          poster={video.imageLink}
          style={{
            width: "100%", // Largura do vídeo
            height: "400px", // Altura ajustável do vídeo
            objectFit: "cover", // Ajusta o vídeo para preencher o espaço proporcionalmente
            borderRadius: "8px", // Opcional: arredonda as bordas
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
