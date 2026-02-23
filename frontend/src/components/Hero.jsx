import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "./ui/button";
import "./Hero.css";

const Hero = ({ data }) => {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-label">Welcome to my portfolio</div>
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">{data.name}</span>
          </h1>
          <p className="hero-subtitle">{data.title}</p>
          <p className="hero-description">{data.description}</p>
          <div className="hero-buttons">
            <Button
              className="btn-primary"
              onClick={(e) => handleScroll(e, "#projects")}
            >
              {data.ctaButtons[0].text}
              <ArrowRight className="btn-icon" size={20} />
            </Button>
            <Button
              variant="outline"
              className="btn-secondary"
              onClick={(e) => handleScroll(e, "#contact")}
            >
              {data.ctaButtons[1].text}
            </Button>
            <Button
              variant="outline"
              className="btn-secondary"
              onClick={() => {
                const link = document.createElement('a');
                link.href = process.env.PUBLIC_URL + '/resume.pdf';
                link.download = 'Gowtham_Resume.pdf';
                link.click();
              }}
            >
              Download Resume
              <Download className="btn-icon" size={20} />
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="code-block">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="code-title">developer.js</span>
              </div>
              <div className="code-content">
                <code>
                  <span className="code-keyword">const</span>{" "}
                  <span className="code-variable">developer</span> = {"{"}"\n"
                  <span className="code-indent">  name: </span>
                  <span className="code-string">'{data.name}'</span>,"\n"
                  <span className="code-indent">  role: </span>
                  <span className="code-string">'{data.title}'</span>,"\n"
                  <span className="code-indent">  passionate: </span>
                  <span className="code-boolean">true</span>,"\n"
                  <span className="code-indent">  available: </span>
                  <span className="code-boolean">true</span>"\n"
                  {"}"}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
