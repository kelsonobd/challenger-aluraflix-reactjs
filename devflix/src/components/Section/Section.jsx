import React from "react";
import "./Section.css";



const Section = ({ title, videos, color }) => (
  <section className={`sectionsIguais ${title.toLowerCase()}Container`}>
    <h3 className={`tituloPequeno ${title.toLowerCase()}Titulo`} style={{ backgroundColor: color }}>
      {title}
    </h3>
    <div className="carousel-container">
      {videos.map((video, index) => (
        <div key={index} className="video-item">
          <video className="video" controls>
            <source src={video.src} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <div className="button-container">
            <button className="button btnDeletar">DELETAR</button>
            <button className="button btnEditar">EDITAR</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Section;
