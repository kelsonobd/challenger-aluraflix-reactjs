import React from "react";
import "./Banner.css";

const Banner = () => (
  <section className="bannerContainer">
    <div className="bannerContainerItens">
      <h1 className="titulo">FRONT END</h1>
      <h2 className="subtitulo">SEO com React</h2>
      <p className="descricao">
        Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica...
      </p>
    </div>
    <video controls>
      <source src="#" type="video/mp4" />
      Seu navegador não suporta vídeos HTML5.
    </video>
  </section>
);

export default Banner;
