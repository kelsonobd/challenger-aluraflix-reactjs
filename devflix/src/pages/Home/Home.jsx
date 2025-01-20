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

  const handleSave = async (updatedVideo) => {
    try {
      const response = await fetch(`http://localhost:5001/videos/${updatedVideo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVideo),
      });

      if (!response.ok) throw new Error("Erro ao salvar vídeo");

      await fetchVideos(); // Atualiza os vídeos após salvar
      setIsModalOpen(false);
      setCurrentVideo(null);
    } catch (error) {
      console.error("Erro ao salvar vídeo:", error);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await fetch(`http://localhost:5001/videos/${videoId}`, { method: "DELETE" });
      await fetchVideos(); // Atualiza os vídeos após deletar
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error);
    }
  };

  const allVideos = [...frontVideos, ...backVideos, ...mobileVideos];
  const lastVideo =
    allVideos.length > 0
      ? allVideos[allVideos.length - 1]
      : {
          title: "Bem-vindo ao Devflix",
          category: "Categoria",
          description: "Adicione novos vídeos para começar a personalizar o seu Devflix!",
          src: "https://via.placeholder.com/800x400",
          imageLink: "https://via.placeholder.com/800x400",
        };

  return (
    <main>
      <Banner video={lastVideo} />
      <Section
        title="FRONT END"
        videos={frontVideos}
        color="#c76e09"
        onEdit={(video) => {
          setCurrentVideo(video);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      <Section
        title="BACK END"
        videos={backVideos}
        color="#006100"
        onEdit={(video) => {
          setCurrentVideo(video);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      <Section
        title="MOBILE"
        videos={mobileVideos}
        color="#1270c3"
        onEdit={(video) => {
          setCurrentVideo(video);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <FormModal
          videoData={currentVideo}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </main>
  );
};

export default Home;
