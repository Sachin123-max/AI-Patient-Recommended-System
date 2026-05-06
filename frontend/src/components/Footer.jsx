import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* TOP SECTION */}
      <div className="footer-top">
        <div className="footer-about">
          <h3>Dr Care Homeopathy</h3>
          <p>
            Trusted natural healing with personalized care. We focus on treating
            the root cause using safe and effective homeopathy solutions.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Appointment</li>
            <li>AI Chat</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* TREATMENTS */}
        <div className="footer-links">
          <h4>Treatments</h4>
          <ul>
            <li>Skin Problems</li>
            <li>Hair Loss</li>
            <li>Thyroid</li>
            <li>PCOS</li>
            <li>Allergies</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p><FaPhoneAlt /> +91 99999 99999</p>
          <p><FaEnvelope /> support@yourclinic.com</p>
          <p><FaMapMarkerAlt /> Panipat, Haryana, India</p>
        </div>
      </div>

      {/* CLINICS */}
      <div className="footer-clinics">
        <h4>Our Clinics</h4>
        <div className="clinic-grid">
          <span>Delhi</span>
          <span>Panipat</span>
          <span>Gurgaon</span>
          <span>Noida</span>
          <span>Chandigarh</span>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Your Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;