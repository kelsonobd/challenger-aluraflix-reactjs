import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <header className="header">
    <Link to="/" className="logoHeader">
      Devflix
    </Link>
    <nav>
      <Link to="/" className="header-button">
        Home
      </Link>
      <Link to="/novo-video" className="header-button">
        Novo Vídeo
      </Link>
    </nav>
  </header>
);

export default Header;
