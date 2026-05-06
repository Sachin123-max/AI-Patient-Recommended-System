import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = ({ title, imageUrl }) => {
  const navigate = useNavigate();

  return (
    <section className="hero container">
      {/* LEFT CONTENT */}
      <div className="hero-content">
        <h1>
          {title} <span className="highlight">Healthcare</span>
        </h1>

        <p>
          ZeeCare Medical Institute provides world-class healthcare services 
          with advanced technology and experienced doctors. We focus on 
          personalized treatment, faster recovery, and patient satisfaction.
        </p>

        <div className="hero-buttons">
          <button
            className="btn primary-btn"
            onClick={() => navigate("/appointment")}
          >
            Book Appointment
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/ai-chatbot")}
          >
            AI Consultation
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hero-image">
        <img src={imageUrl} alt="hero" />
        <div className="circle-bg"></div>
      </div>
    </section>
  );
};

export default Hero;