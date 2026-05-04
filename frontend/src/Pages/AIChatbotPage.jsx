// import React from "react";
// import AIChatbot from "../components/AIChatbot";

// const AIChatbotPage = () => {
//   return (
//     <div className="ai-chatbot-page">
//       <div className="hero-section bg-gradient-to-r from-purple-600 to-blue-800 text-white py-20 px-4 md:px-8 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Doctor Suggester Dashboard</h1>
//         <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90">
//           Talk to our AI about your symptoms and get personalized doctor recommendations instantly!
//         </p>
//       </div>
//       <AIChatbot />
//     </div>
//   );
// };

// export default AIChatbotPage;


import React from "react";
import AIChatbot from "../components/AIChatbot";

const AIChatbotPage = () => {
  return (
    <div className="ai-page">

      {/* ================= HERO SECTION ================= */}
      <div className="ai-hero">

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

      </div>

      {/* ================= CHAT SECTION ================= */}
      <div className="ai-chat-wrapper">
        <AIChatbot />
      </div>

    </div>
  );
};

export default AIChatbotPage;