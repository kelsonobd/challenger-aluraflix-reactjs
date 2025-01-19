import React, { useState, useEffect } from "react";
import "./FormModal.css";

const FormModal = ({ videoData, onClose, onSave }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    imageLink: "",
    videoLink: "",
    description: "",
  });

  // Preenche os campos com os dados do vídeo atual ao abrir o modal
  useEffect(() => {
    if (videoData) {
      setFormValues({
        title: videoData.title || "",
        category: videoData.category || "",
        imageLink: videoData.imageLink || "",
        videoLink: videoData.videoLink || "",
        description: videoData.description || "",
      });
    }
  }, [videoData]);

  // Atualiza os valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...videoData, ...formValues }); // Passa os dados atualizados para a função de salvar
    onClose(); // Fecha o modal
  };

  return (
    <div className="modal-overlay">
      <div className="containerFormModal">
        <div className="tituloEbtn">
          <h1 className="tituloFormModal">EDITAR CARD</h1>
          <span className="close-span" onClick={onClose}>
            &times; {/* O caractere &times; é o "X" no HTML */}
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Digite o título do vídeo"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              name="category"
              value={formValues.category}
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
          <div>
            <label htmlFor="image-link">Imagem</label>
            <input
              type="url"
              id="image-link"
              name="imageLink"
              placeholder="Insira o link da imagem"
              value={formValues.imageLink}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="video-link">Vídeo</label>
            <input
              type="url"
              id="video-link"
              name="videoLink"
              placeholder="Insira o link do vídeo"
              value={formValues.videoLink}
              onChange={handleChange}
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
              value={formValues.description}
              onChange={handleChange}
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
