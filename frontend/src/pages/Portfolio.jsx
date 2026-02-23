import React, { useState } from "react";
import { portfolioData } from "../mock";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <Header />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Skills data={portfolioData.skills} />
      <Projects data={portfolioData.projects} />
      <Experience data={portfolioData.experience} />
      <Contact data={portfolioData.contact} />
      <Footer />
    </div>
  );
};

export default Portfolio;
