import React from "react";
import "./NewVideo.css";

const NewVideo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para guardar o vídeo
    console.log("Formulário enviado!");
  };

  const handleReset = () => {
    console.log("Formulário limpo!");
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
            {/* Linha para Título e Categoria */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Digite o título do vídeo"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select id="category" name="category" required>
                  <option value="" disabled selected>
                    Selecione uma categoria
                  </option>
                  <option value="front-end">Front-End</option>
                  <option value="back-end">Back-End</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
            </div>

            {/* Linha para Link da Imagem e Vídeo */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image-link">Imagem</label>
                <input
                  type="url"
                  id="image-link"
                  name="image-link"
                  placeholder="Insira o link da imagem"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="video-link">Vídeo</label>
                <input
                  type="url"
                  id="video-link"
                  name="video-link"
                  placeholder="Insira o link do vídeo"
                  required
                />
              </div>
            </div>

            {/* Campo para Descrição */}
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Escreva uma breve descrição do vídeo"
                required
              ></textarea>
            </div>

            {/* Botões */}
            <div className="form-buttons">
              <button type="submit">Guardar</button>
              <button type="reset" onClick={handleReset}>
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
