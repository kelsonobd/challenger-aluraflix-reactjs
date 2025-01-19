import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Section from "../../components/Section/Section";
import FormModal from "../../components/FormModal/FormModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Mock de vídeos iniciais
  const mockFrontVideos = [
    {
      id: "mock1",
      title: "Introdução ao React",
      category: "front-end",
      description: "Um vídeo introdutório sobre React.js",
      imageLink: "https://via.placeholder.com/800x400?text=React",
      videoLink: "https://www.youtube.com/embed/dpw9EHDh2bM",
    },
    {
      id: "mock2",
      title: "Componentes em React",
      category: "front-end",
      description: "Entenda como criar e reutilizar componentes.",
      imageLink: "https://via.placeholder.com/800x400?text=Componentes",
      videoLink: "https://www.youtube.com/embed/Ke90Tje7VS0",
    },
    {
      id: "mock3",
      title: "Hooks no React",
      category: "front-end",
      description: "Aprenda a usar useState e useEffect.",
      imageLink: "https://via.placeholder.com/800x400?text=Hooks",
      videoLink: "https://www.youtube.com/embed/-MlNBTSg_Ww",
    },
    {
      id: "mock4",
      title: "Context API no React",
      category: "front-end",
      description: "Gerenciamento de estado com Context API.",
      imageLink: "https://via.placeholder.com/800x400?text=Context+API",
      videoLink: "https://www.youtube.com/embed/35lXWvCuM8o",
    },
    {
      id: "mock5",
      title: "React Router",
      category: "front-end",
      description: "Navegação entre páginas com React Router.",
      imageLink: "https://via.placeholder.com/800x400?text=Router",
      videoLink: "https://www.youtube.com/embed/Ul3y1LXxzdU",
    },
    {
      id: "mock6",
      title: "Styled Components",
      category: "front-end",
      description: "Estilização com Styled Components no React.",
      imageLink: "https://via.placeholder.com/800x400?text=Styled+Components",
      videoLink: "https://www.youtube.com/embed/bIK2NwoK9xk",
    },
    {
      id: "mock7",
      title: "Testando Aplicações React",
      category: "front-end",
      description: "Introdução a testes no React.",
      imageLink: "https://via.placeholder.com/800x400?text=Testes",
      videoLink: "https://www.youtube.com/embed/3e1GHCA3GP0",
    },
    {
      id: "mock8",
      title: "Redux no React",
      category: "front-end",
      description: "Aprenda sobre Redux e gerenciamento de estado.",
      imageLink: "https://via.placeholder.com/800x400?text=Redux",
      videoLink: "https://www.youtube.com/embed/93p3LxR9xfM",
    },
  ];

  const mockBackVideos = [
    {
      id: "mock9",
      title: "Node.js para Iniciantes",
      category: "back-end",
      description: "Aprenda o básico de Node.js",
      imageLink: "https://via.placeholder.com/800x400?text=Node.js",
      videoLink: "https://www.youtube.com/embed/TlB_eWDSMt4",
    },
    {
      id: "mock10",
      title: "Express.js Básico",
      category: "back-end",
      description: "Criando APIs REST com Express.js.",
      imageLink: "https://via.placeholder.com/800x400?text=Express",
      videoLink: "https://www.youtube.com/embed/L72fhGm1tfE",
    },
  ];

  const mockMobileVideos = [
    {
      id: "mock11",
      title: "React Native do Zero",
      category: "mobile",
      description: "Aprenda React Native e desenvolva apps",
      imageLink: "https://via.placeholder.com/800x400?text=React+Native",
      videoLink: "https://www.youtube.com/embed/0-S5a0eXPoc",
    },
    {
      id: "mock12",
      title: "Flutter Básico",
      category: "mobile",
      description: "Introdução ao Flutter.",
      imageLink: "https://via.placeholder.com/800x400?text=Flutter",
      videoLink: "https://www.youtube.com/embed/fq4N0hgOWzU",
    },
  ];

  const [frontVideos, setFrontVideos] = useState(mockFrontVideos);
  const [backVideos, setBackVideos] = useState(mockBackVideos);
  const [mobileVideos, setMobileVideos] = useState(mockMobileVideos);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5001/videos");
      if (!response.ok) throw new Error("Erro ao buscar vídeos");

      const data = await response.json();

      // Combinar os mocks com os vídeos da API
      setFrontVideos([
        ...mockFrontVideos,
        ...data.filter((video) => video.category === "front-end"),
      ]);
      setBackVideos([
        ...mockBackVideos,
        ...data.filter((video) => video.category === "back-end"),
      ]);
      setMobileVideos([
        ...mockMobileVideos,
        ...data.filter((video) => video.category === "mobile"),
      ]);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const allVideos = [...frontVideos, ...backVideos, ...mobileVideos];
  const lastVideo =
    allVideos.length > 0
      ? allVideos[allVideos.length - 1]
      : {
          title: "Bem-vindo ao Devflix",
          category: "Sem Categoria",
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

      fetchVideos(); // Atualiza os vídeos após salvar
      setIsModalOpen(false);
      setCurrentVideo(null);
    } catch (error) {
      console.error("Erro ao salvar vídeo:", error);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await fetch(`http://localhost:5001/videos/${videoId}`, { method: "DELETE" });
      fetchVideos(); // Atualiza os vídeos após deletar
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error);
    }
  };

  return (
    <main>
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
