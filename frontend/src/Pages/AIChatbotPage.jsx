import React from "react";
import AIChatbot from "../components/AIChatbot";

const AIChatbotPage = () => {
  return (
    <div className="ai-page">

      {/* ================= HERO SECTION ================= */}
      <section className="ai-hero">

        <div className="hero-content">

          <h1>🩺 AI Doctor Assistant</h1>

          <p>
            Get instant doctor recommendations based on your symptoms.
            Our AI analyzes your condition and suggests the right specialist.
          </p>

          <div className="hero-badges">
            <span>⚡ Instant Response</span>
            <span>🔒 Secure & Private</span>
            <span>👨‍⚕️ Verified Doctors</span>
          </div>

        </div>

      </section>

      {/* ================= CHAT SECTION ================= */}
      <section className="ai-chat-wrapper">
        <AIChatbot />
      </section>

    </div>
  );
};

export default AIChatbotPage;