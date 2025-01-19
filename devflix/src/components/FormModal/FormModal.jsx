import React from "react";
import "./FormModal.css";

const FormModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="containerFormModal">
       <div className="tituloEbtn">
        <h1 className="tituloFormModal">EDITAR CARD</h1>
        <span className="close-span" onClick={onClose}>
          &times; {/* O caractere &times; é o "X" no HTML */}
        </span>
        </div>
        <form>
          <div>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Digite o título do vídeo"
              required
            />
          </div>
          <div>
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
          <div>
            <label htmlFor="image-link">Link da Imagem de Capa:</label>
            <input
              type="url"
              id="image-link"
              name="image-link"
              placeholder="Insira o link da imagem"
              required
            />
          </div>
          <div>
            <label htmlFor="video-link">Vídeo</label>
            <input
              type="url"
              id="video-link"
              name="video-link"
              placeholder="Insira o link do vídeo"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Escreva uma breve descrição do vídeo"
              required
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
