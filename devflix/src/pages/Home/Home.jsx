import React from "react";
import Banner from "../../components/Banner/Banner";
import Section from "../../components/Section/Section";

const Home = () => {
  const frontVideos = [
    { src: "video1.mp4" },
    { src: "video2.mp4" },
    { src: "video3.mp4" },
  ];

  const backVideos = [
    { src: "video1.mp4" },
    { src: "video2.mp4" },
    { src: "video3.mp4" },
  ];

  const mobileVideos = [
    { src: "video1.mp4" },
    { src: "video2.mp4" },
    { src: "video3.mp4" },
  ];

  return (
    <main>
      <Banner />
      <Section title="FRONT END" videos={frontVideos} color="#c76e09" />
      <Section title="BACK END" videos={backVideos} color="#006100" />
      <Section title="MOBILE" videos={mobileVideos} color="#1270c3" />
    </main>
  );
};

export default Home;