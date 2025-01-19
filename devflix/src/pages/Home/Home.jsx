import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Section from "../../components/Section/Section";
import FormModal from "../../components/FormModal/FormModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Mock de vídeos iniciais
  const mockFrontVideos = [
    { id: "mock1", title: "Introdução ao React", category: "front-end", description: "Um vídeo introdutório sobre React.js", imageLink: "https://via.placeholder.com/800x400?text=React", videoLink: "https://www.youtube.com/embed/dpw9EHDh2bM" },
    { id: "mock2", title: "React Hooks Avançados", category: "front-end", description: "Entenda hooks complexos", imageLink: "https://via.placeholder.com/800x400?text=React+Hooks", videoLink: "https://www.youtube.com/embed/TNhaISOUy6Q" },
    { id: "mock3", title: "Gerenciamento de Estado", category: "front-end", description: "Aprenda Redux e Context API", imageLink: "https://via.placeholder.com/800x400?text=Redux", videoLink: "https://www.youtube.com/embed/93p3LxR9xfM" },
    { id: "mock4", title: "Componentes Funcionais", category: "front-end", description: "Explore o poder dos componentes", imageLink: "https://via.placeholder.com/800x400?text=Componentes", videoLink: "https://www.youtube.com/embed/kVeOpcw4GWY" },
    { id: "mock5", title: "Testando Aplicações React", category: "front-end", description: "Configure Jest e React Testing Library", imageLink: "https://via.placeholder.com/800x400?text=React+Testing", videoLink: "https://www.youtube.com/embed/3e1GHCA3GP0" },
    { id: "mock6", title: "React Router Básico", category: "front-end", description: "Configuração de rotas em React", imageLink: "https://via.placeholder.com/800x400?text=React+Router", videoLink: "https://www.youtube.com/embed/Law7wfdg_ls" },
    { id: "mock7", title: "Melhores Práticas em CSS", category: "front-end", description: "Combine CSS Modules e Styled Components", imageLink: "https://via.placeholder.com/800x400?text=CSS+React", videoLink: "https://www.youtube.com/embed/FXdYSQ6nu-M" },
    { id: "mock8", title: "React com TypeScript", category: "front-end", description: "Adicione segurança ao seu código", imageLink: "https://via.placeholder.com/800x400?text=React+TypeScript", videoLink: "https://www.youtube.com/embed/Z5iWr6Srsj8" },
  ];

  const mockBackVideos = [
    { id: "mock9", title: "Node.js para Iniciantes", category: "back-end", description: "Aprenda o básico de Node.js", imageLink: "https://via.placeholder.com/800x400?text=Node.js", videoLink: "https://www.youtube.com/embed/TlB_eWDSMt4" },
    { id: "mock10", title: "API RESTful com Express", category: "back-end", description: "Desenvolvendo APIs com Express.js", imageLink: "https://via.placeholder.com/800x400?text=Express", videoLink: "https://www.youtube.com/embed/L72fhGm1tfE" },
    { id: "mock11", title: "Banco de Dados com MongoDB", category: "back-end", description: "Utilizando MongoDB no backend", imageLink: "https://via.placeholder.com/800x400?text=MongoDB", videoLink: "https://www.youtube.com/embed/oSIv-E60NiU" },
    { id: "mock12", title: "Autenticação com JWT", category: "back-end", description: "Implemente segurança nas suas APIs", imageLink: "https://via.placeholder.com/800x400?text=JWT", videoLink: "https://www.youtube.com/embed/mbsmsi7l3r4" },
    { id: "mock13", title: "Node.js Avançado", category: "back-end", description: "Streams e EventEmitter", imageLink: "https://via.placeholder.com/800x400?text=Node.js+Avançado", videoLink: "https://www.youtube.com/embed/ENrzD9HAZK4" },
    { id: "mock14", title: "Testes em Node.js", category: "back-end", description: "Configuração de testes no backend", imageLink: "https://via.placeholder.com/800x400?text=Node.js+Testes", videoLink: "https://www.youtube.com/embed/Mzo7q1STjUM" },
    { id: "mock15", title: "Gerenciamento de Arquivos", category: "back-end", description: "Upload e manipulação de arquivos", imageLink: "https://via.placeholder.com/800x400?text=Upload+Files", videoLink: "https://www.youtube.com/embed/VOnKbkBkzBA" },
    { id: "mock16", title: "Sockets em Node.js", category: "back-end", description: "Construindo chat em tempo real", imageLink: "https://via.placeholder.com/800x400?text=WebSocket", videoLink: "https://www.youtube.com/embed/HN1UjzRSdBk" },
  ];

  const mockMobileVideos = [
    { id: "mock17", title: "React Native do Zero", category: "mobile", description: "Aprenda React Native e desenvolva apps", imageLink: "https://via.placeholder.com/800x400?text=React+Native", videoLink: "https://www.youtube.com/embed/0-S5a0eXPoc" },
    { id: "mock18", title: "Expo CLI: Primeiros Passos", category: "mobile", description: "Crie aplicativos com Expo CLI", imageLink: "https://via.placeholder.com/800x400?text=Expo+CLI", videoLink: "https://www.youtube.com/embed/1hPgQWbWmEk" },
    { id: "mock19", title: "React Navigation Básico", category: "mobile", description: "Adicionando navegação ao seu app", imageLink: "https://via.placeholder.com/800x400?text=React+Navigation", videoLink: "https://www.youtube.com/embed/sdmgJkGUXNE" },
    { id: "mock20", title: "Redux com React Native", category: "mobile", description: "Gerencie estados globalmente", imageLink: "https://via.placeholder.com/800x400?text=Redux+React+Native", videoLink: "https://www.youtube.com/embed/93p3LxR9xfM" },
    { id: "mock21", title: "Firebase no React Native", category: "mobile", description: "Adicione autenticação com Firebase", imageLink: "https://via.placeholder.com/800x400?text=Firebase+React+Native", videoLink: "https://www.youtube.com/embed/pSvA0Y3x3Jo" },
    { id: "mock22", title: "Consumindo APIs no Mobile", category: "mobile", description: "Faça requisições HTTP em apps", imageLink: "https://via.placeholder.com/800x400?text=APIs+Mobile", videoLink: "https://www.youtube.com/embed/5zlVX6UMqAU" },
    { id: "mock23", title: "Animações no React Native", category: "mobile", description: "Aprenda a criar animações incríveis", imageLink: "https://via.placeholder.com/800x400?text=Animações+React+Native", videoLink: "https://www.youtube.com/embed/2V1E6Esa6Hg" },
    { id: "mock24", title: "Deploy de Apps Mobile", category: "mobile", description: "Publique seu app na Play Store", imageLink: "https://via.placeholder.com/800x400?text=Deploy+Mobile", videoLink: "https://www.youtube.com/embed/aS41wXKFbwQ" },
  ];

  const [frontVideos, setFrontVideos] = useState(mockFrontVideos);
  const [backVideos, setBackVideos] = useState(mockBackVideos);
  const [mobileVideos, setMobileVideos] = useState(mockMobileVideos);

  return (
    <main>
      <Banner video={frontVideos[0] || backVideos[0] || mobileVideos[0]} />
      <Section title="FRONT END" videos={frontVideos} color="#c76e09" />
      <Section title="BACK END" videos={backVideos} color="#006100" />
      <Section title="MOBILE" videos={mobileVideos} color="#1270c3" />
    </main>
  );
};

export default Home;
