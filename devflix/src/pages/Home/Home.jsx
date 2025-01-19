import React, { useState } from "react";
import Banner from "../../components/Banner/Banner";
import Section from "../../components/Section/Section";
import FormModal from "../../components/FormModal/FormModal";

const Home = () => {
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Estado para armazenar os dados do vídeo a ser editado
  const [currentVideo, setCurrentVideo] = useState(null);

  // Lista de vídeos
  const frontVideos = [
    { id: 1, src: "video1.mp4", title: "React Basics", category: "Front-End" },
    { id: 2, src: "video2.mp4", title: "React Advanced", category: "Front-End" },
  ];

  const backVideos = [
    { id: 3, src: "video1.mp4", title: "Node.js Basics", category: "Back-End" },
    { id: 4, src: "video2.mp4", title: "Express.js", category: "Back-End" },
  ];

  const mobileVideos = [
    { id: 5, src: "video1.mp4", title: "React Native Basics", category: "Mobile" },
    { id: 6, src: "video2.mp4", title: "Flutter Basics", category: "Mobile" },
  ];

  // Função para abrir o modal com os dados do vídeo
  const handleEdit = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  // Função para salvar as alterações feitas no modal
  const handleSave = (updatedVideo) => {
    console.log("Vídeo atualizado:", updatedVideo);
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <main>
      <Banner />
      {/* Renderizar seções com o botão de editar */}
      <Section
        title="FRONT END"
        videos={frontVideos}
        color="#c76e09"
        onEdit={handleEdit}
      />
      <Section
        title="BACK END"
        videos={backVideos}
        color="#006100"
        onEdit={handleEdit}
      />
      <Section
        title="MOBILE"
        videos={mobileVideos}
        color="#1270c3"
        onEdit={handleEdit}
      />

      {/* Modal de edição */}
      {isModalOpen && (
        <FormModal
          videoData={currentVideo}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </main>
  );
};

export default Home;
