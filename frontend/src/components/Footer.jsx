import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone, FaFacebook, FaInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="footer">

      <motion.div
        className="footer-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* 🔹 Logo */}
        <div className="footer-box">
          <img src="/logo.png" alt="logo" className="logo-img" />
          <p>Modern Healthcare System for Easy Appointment Booking.</p>

          <div className="socials">
            <FaFacebook />
            <FaInstagram />
          </div>
        </div>

        {/* 🔹 Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/appointment">Appointment</Link>
          <Link to="/about">About</Link>
        </div>

        {/* 🔹 Hours */}
        <div className="footer-box">
          <h3>Working Hours</h3>
          {hours.map((item) => (
            <div key={item.id} className="time-row">
              <span>{item.day}</span>
              <span>{item.time}</span>
            </div>
          ))}
        </div>

        {/* 🔹 Contact */}
        <div className="footer-box">
          <h3>Contact</h3>

          <div className="contact-item">
            <FaPhone />
            <span>999-999-9999</span>
          </div>

          <div className="contact-item">
            <MdEmail />
            <span>zeelab@gmail.com</span>
          </div>

          <div className="contact-item">
            <FaLocationArrow />
            <span>Toronto, Canada</span>
          </div>
        </div>

      </motion.div>

      <div className="footer-bottom">
        <p>© 2026 ZeeCare Medical Institute. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;