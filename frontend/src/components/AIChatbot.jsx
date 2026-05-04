import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";


const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi 👋! Describe your symptoms and I will suggest doctors."
    }
  ]);

  const [input, setInput] = useState("");
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/ai/ai-suggest-doctor",
        { symptoms: input },
        { withCredentials: true }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            data.message ||
            "Here are some doctors based on your symptoms 🩺"
        }
      ]);

      setSuggestedDoctors(data.doctors || []);
      toast.success("Doctors suggested successfully");

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "⚠️ Unable to fetch suggestions. Try again later."
        }
      ]);

      toast.error("Server Error");
    } finally {
      setLoading(false);
      setInput("");
      inputRef.current?.focus();
    }
  };

  // ================= BOOK DOCTOR =================
  const bookDoctor = (doctorId) => {
    if (!isAuthenticated) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }

    navigate(`/appointment?doctorId=${doctorId}`);
  };

  return (
    <div className="chatbot-container">

      <div className="chatbot-grid">

        {/* ================= CHAT SECTION ================= */}
        <div className="chat-section">

          {/* HEADER */}
          <div className="chat-title">
            🩺 AI Health Assistant
          </div>

          {/* MESSAGES */}
          <div className="messages-box">

            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message-row ${msg.role}`}
              >
                <div className="message-bubble">
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="typing">
                AI is analyzing symptoms...
              </div>
            )}

          </div>

          {/* INPUT */}
          <div className="input-box">

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Enter symptoms (fever, headache...)"
              disabled={loading}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              Send
            </button>

          </div>

        </div>

        {/* ================= DOCTOR SECTION ================= */}
        <div className="doctor-section">

          <h3>👨‍⚕️ Suggested Doctors</h3>

          {suggestedDoctors.length === 0 ? (
            <p className="no-data">
              No suggestions yet. Enter symptoms to get recommendations.
            </p>
          ) : (
            suggestedDoctors.map((doc, i) => (
              <motion.div
                key={doc._id || i}
                whileHover={{ scale: 1.02 }}
                className="doctor-card"
              >

                <h4>Dr. {doc.name}</h4>
                <p>{doc.specialty}</p>

                <button onClick={() => bookDoctor(doc._id)}>
                  Book Appointment
                </button>

              </motion.div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default AIChatbot;