import React, { useState } from "react";
import "./NewVideo.css";

const NewVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    imageLink: "",
    videoLink: "",
    description: "",
  });

  const [mockVideos, setMockVideos] = useState([]); // Para armazenar localmente como fallback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Vídeo adicionado com sucesso!");
        setFormData({
          title: "",
          category: "",
          imageLink: "",
          videoLink: "",
          description: "",
        });
      } else {
        throw new Error("Erro ao adicionar vídeo no servidor.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor. Salvando localmente:", error);

      // Adiciona o vídeo aos mocks
      setMockVideos((prev) => [
        ...prev,
        { id: Date.now().toString(), ...formData },
      ]);

      alert("Servidor indisponível. Vídeo salvo localmente.");
      setFormData({
        title: "",
        category: "",
        imageLink: "",
        videoLink: "",
        description: "",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      imageLink: "",
      videoLink: "",
      description: "",
    });
  };

  return (
    <div className="containerCadastro">
      <h1 className="titulo">NOVO VÍDEO</h1>
      <p className="descricaoTitulo">
        Complete o formulário para criar um novo card de vídeo
      </p>
      <div className="containerFormulario">
        <div className="form-container">
          <h2 className="subtitulo">Criar Card</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título do vídeo"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  <option value="front-end">Front-End</option>
                  <option value="back-end">Back-End</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="imageLink">Imagem</label>
                <input
                  type="url"
                  id="imageLink"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleChange}
                  placeholder="Insira o link da imagem"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="videoLink">Vídeo</label>
                <input
                  type="url"
                  id="videoLink"
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="Insira o link do vídeo"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Escreva uma breve descrição do vídeo"
                required
              ></textarea>
            </div>

            <div className="form-buttons">
              <button type="submit">Guardar</button>
              <button type="reset" onClick={handleReset}>
                Limpar
              </button>
            </div>
          </form>

          {mockVideos.length > 0 && (
            <div className="mock-container">
              <h3>Vídeos Salvos Localmente:</h3>
              <ul>
                {mockVideos.map((video) => (
                  <li key={video.id}>
                    {video.title} - {video.category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
