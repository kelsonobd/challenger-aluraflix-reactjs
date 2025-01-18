
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import NewVideo from "./pages/NewVideo/NewVideo";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rota para a página inicial */}
        <Route path="/" element={<Home />} />
        {/* Rota para a página de adicionar novo vídeo */}
        <Route path="/novo-video" element={<NewVideo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
