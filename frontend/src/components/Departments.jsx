import React from "react";
import { useNavigate } from "react-router-dom";

const departments = [
  { key: "cardio", title: "Cardio Healing", image: "/department/cardio.jpg" },
  { key: "derma", title: "Skin & Derma", image: "/department/derma.jpg" },
  { key: "ent", title: "ENT Care", image: "/department/ent.jpg" },
  { key: "neuro", title: "Neuro Support", image: "/department/neuro.jpg" },
  { key: "ortho", title: "Ortho Therapy", image: "/department/ortho.jpg" },
  { key: "pedia", title: "Pediatrics", image: "/department/pedia.jpg" },
  { key: "radio", title: "Radiant Wellness", image: "/department/radio.jpg" },
  { key: "onco", title: "Oncology Support", image: "/department/onco.jpg" },
];

const Departments = () => {
  const navigate = useNavigate();

  const handleCardClick = (deptKey) => {
    navigate(`/appointment?department=${encodeURIComponent(deptKey)}`);
  };

  return (
    <section className="departments-section">
      <h2>Natural Healing for Every Health Concern</h2>

      <div className="departments-grid">
        {departments.map((d) => (
          <button
            key={d.key}
            type="button"
            className="dept-card"
            onClick={() => handleCardClick(d.key)}
            aria-label={`Open appointment for ${d.title}`}
          >
            <div className="image-wrapper">
              <img src={d.image} alt={d.title} />
              <div className="overlay" />
            </div>

            <div className="dept-card-content">
              <h3>{d.title}</h3>
              <p>{d.title}</p>
              <span className="dept-cta">→</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Departments;
 