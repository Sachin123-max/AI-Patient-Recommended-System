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
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  // ================= SEND MESSAGE =================
  const getBasicMedicineInfo = (symptomsRaw) => {
    const s = (symptomsRaw || "").toLowerCase();

    // helper
    const redFlags = [
      "Severe breathing difficulty / chest pain",
      "Very high fever (>103°F / 39.4°C) or fever > 3 days",
      "Blood in cough/vomit/stool, severe dehydration",
      "Severe headache with neck stiffness, confusion, fainting",
      "Symptoms in infants/elderly or known serious conditions",
    ];

    const response = {
      title: "Basic care guidance (not a diagnosis)",
      bullets: [],
      medicines: [],
      precautions: [],
      redFlags,
    };

    const hasAny = (...keys) => keys.some((k) => s.includes(k));

    // Fever / Body ache
    if (hasAny("fever", "temperature", "chills", "body ache", "bodyache", "aches")) {
      response.title = "Fever / Body ache: basic care";
      response.medicines = [
        "Paracetamol (Acetaminophen) for fever/pain (as per label; avoid overdose)",
        "ORS (Oral Rehydration Salts) or plenty of fluids",
      ];
      response.bullets = [
        "Rest and keep yourself hydrated",
        "Light meals; avoid alcohol",
        "Cool compress if uncomfortable",
      ];
      response.precautions = [
        "Avoid taking multiple cold/fever combination medicines together",
        "If you have liver disease, ask a doctor before paracetamol",
      ];
      return response;
    }

    // Headache
    if (hasAny("headache", "migraine", "head pain")) {
      response.title = "Headache: basic care";
      response.medicines = [
        "Paracetamol or Ibuprofen (if suitable) as per label",
      ];
      response.bullets = [
        "Drink water and rest in a dark room",
        "Avoid strong smells/screens if it worsens",
        "If migraine-like: consider cold compress",
      ];
      response.precautions = [
        "Avoid frequent painkiller use (can worsen headaches)",
        "If severe sudden headache or neurological symptoms → urgent care",
      ];
      return response;
    }

    // Cough / Cold
    if (hasAny("cough", "cold", "sneezing", "runny nose", "rhinitis", "phlegm", "phlegm")) {
      response.title = "Cough / Cold: basic care";
      response.medicines = [
        "Warm fluids + steam inhalation (if suitable)",
        "For dry cough: cough suppressant (as per label)",
        "For mucus/phlegm: expectorant (as per label) + hydration",
      ];
      response.bullets = [
        "Gargle with warm salt water for throat irritation",
        "Honey in warm water (avoid for children < 1 year)",
        "Sleep with head slightly elevated",
      ];
      response.precautions = [
        "If wheezing/shortness of breath: seek medical help",
        "Avoid antibiotics unless prescribed",
      ];
      return response;
    }

    // Sore throat
    if (hasAny("sore throat", "throat pain", "throat", "tonsil")) {
      response.title = "Sore throat: basic care";
      response.medicines = [
        "Warm salt-water gargles",
        "Paracetamol or Ibuprofen for pain (as per label)",
        "Throat lozenges (as per label) if available",
      ];
      response.bullets = [
        "Hydrate well; avoid spicy/very hot foods",
        "Rest your voice",
      ];
      response.precautions = [
        "If high fever, pus on tonsils, or symptoms > 3 days → see a doctor",
      ];
      return response;
    }

    // Stomach / Acidity / loose motions (simple)
    if (hasAny("acidity", "heartburn", "gas", "indigestion", "stomach", "vomit", "nausea")) {
      response.title = "Stomach discomfort: basic care";
      response.medicines = [
        "Antacid as per label (for acidity)",
        "Oral rehydration if loose motions/vomiting",
      ];
      response.bullets = [
        "Small sips of water/ORS; avoid oily/spicy foods",
        "Eat light (curd/banana/rice) if tolerated",
      ];
      response.precautions = [
        "If severe abdominal pain, blood in vomit/stool, or dehydration → urgent care",
      ];
      return response;
    }

    if (hasAny("diarrhea", "loose motions", "vomiting")) {
      response.title = "Diarrhea / vomiting: basic care";
      response.medicines = [
        "ORS (priority) + plenty of fluids",
        "Zinc may help (as per local guidance/label)",
      ];
      response.bullets = [
        "Avoid dehydration; small frequent sips",
        "Avoid dairy/very oily foods temporarily",
      ];
      response.precautions = [
        "If blood in stool, high fever, or symptoms > 48 hours → doctor",
      ];
      return response;
    }

    // Default
    response.title = "Basic medicine info (general)";
    response.medicines = ["Paracetamol for fever/pain (as per label)"];
    response.bullets = [
      "Hydration + rest",
      "Avoid self-medicating antibiotics",
      "Monitor temperature and symptom changes",
    ];
    response.precautions = [
      "If symptoms worsen or last > 3 days, consult a doctor",
    ];

    return response;
  };

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

      const docs = data.doctors || [];
      setSuggestedDoctors(docs);
      setActiveDoctor(docs.length ? docs[0] : null);

      // If no doctors found, also write basic medicine/self-care info into chat
      if (!docs.length) {
        const basic = getBasicMedicineInfo(input);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `${basic.title}\n\nMedicines/OTC ideas:\n- ${basic.medicines.join(
              "\n- "
            )}\n\nPrecautions:\n- ${basic.precautions.join("\n- ")}\n\nRed flags (seek medical help if any):\n- ${basic.redFlags.join(
              "\n- "
            )}`,
          },
        ]);
      }

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

          <h3> Suggested Doctors</h3>

          {suggestedDoctors.length === 0 ? (
            <div className="no-data">
              <p>No doctors found for your symptoms </p>
              <p><small>Add doctors via Dashboard → Add New Doctor</small></p>
            </div>
          ) : (
            <>
              {/* Selected doctor details */}
              {activeDoctor && (
                <div className="selected-doctor">
                  <h4>Selected Doctor</h4>

                  <div className="selected-doctor-card">
                    {activeDoctor.docAvatar && (
                      <img
                        src={activeDoctor.docAvatar}
                        alt={`Dr. ${activeDoctor.name}`}
                        style={{ width: 64, height: 64, borderRadius: "50%" }}
                      />
                    )}

                    <div>
                      <p style={{ margin: 0 }}>
                        <strong>Dr. {activeDoctor.name}</strong>
                      </p>
                      <p style={{ margin: 0 }}>{activeDoctor.specialty}</p>
                      {activeDoctor.phone && (
                        <p style={{ margin: 0 }}>📞 {activeDoctor.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor list */}
              {suggestedDoctors.map((doc, i) => (
                <motion.div
                  key={doc._id || i}
                  whileHover={{ scale: 1.02 }}
                  className="doctor-card"
                  onClick={() => setActiveDoctor(doc)}
                  style={{ cursor: "pointer" }}
                >
                  <h4>Dr. {doc.name}</h4>
                  <p>{doc.specialty}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDoctor(doc);
                      bookDoctor(doc._id);
                    }}
                  >
                    Book Appointment
                  </button>
                </motion.div>
              ))}
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default AIChatbot;