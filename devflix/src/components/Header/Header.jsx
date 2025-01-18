import React from "react";
import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="logoHeader">Devflix</div>
    <nav>
      <button className="header-button">Home</button>
      <button className="header-button">Novo Vídeo</button>
    </nav>
  </header>
);

export default Header;
