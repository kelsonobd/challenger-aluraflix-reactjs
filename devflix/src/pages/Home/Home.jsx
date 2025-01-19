import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Section from "../../components/Section/Section";
import FormModal from "../../components/FormModal/FormModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [frontVideos, setFrontVideos] = useState([]);
  const [backVideos, setBackVideos] = useState([]);
  const [mobileVideos, setMobileVideos] = useState([]);

  // Função para buscar vídeos da API
  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5001/videos");
      if (!response.ok) throw new Error("Erro ao buscar vídeos");

      const data = await response.json();

      // Separar vídeos por categoria
      setFrontVideos(data.filter((video) => video.category === "front-end"));
      setBackVideos(data.filter((video) => video.category === "back-end"));
      setMobileVideos(data.filter((video) => video.category === "mobile"));
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  };

  // Buscar vídeos na montagem do componente
  useEffect(() => {
    fetchVideos();
  }, []);

  // Combinar todos os vídeos em uma única lista
  const allVideos = [...frontVideos, ...backVideos, ...mobileVideos];
  const lastVideo =
    allVideos.length > 0
      ? allVideos[allVideos.length - 1]
      : {
          title: "Bem-vindo ao Devflix",
          category: "Sem video",
          description: "Adicione novos vídeos para começar a personalizar o seu Devflix!",
          src: "https://via.placeholder.com/800x400",
          imageLink: "https://via.placeholder.com/800x400",
        };

  const handleEdit = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  const handleSave = (updatedVideo) => {
    console.log("Vídeo atualizado:", updatedVideo);
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  const handleDelete = async (videoId) => {
    try {
      await fetch(`http://localhost:5001/videos/${videoId}`, { method: "DELETE" });

      // Atualiza os estados locais
      setFrontVideos((prev) => prev.filter((video) => video.id !== videoId));
      setBackVideos((prev) => prev.filter((video) => video.id !== videoId));
      setMobileVideos((prev) => prev.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error);
    }
  };

  return (
    <main>
      {/* Renderizar sempre o Banner com os dados do último vídeo ou do banner padrão */}
      <Banner video={lastVideo} />
      <Section
        title="FRONT END"
        videos={frontVideos}
        color="#c76e09"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Section
        title="BACK END"
        videos={backVideos}
        color="#006100"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Section
        title="MOBILE"
        videos={mobileVideos}
        color="#1270c3"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
