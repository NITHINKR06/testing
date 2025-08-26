import React from "react";
import Link from "next/link";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Logo / Branding */}
        <div className="footer-section footer-brand">
          <h2>CyberSaathi</h2>
          <p>Your cybersecurity companion</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section footer-links">
<h4>Quick Links</h4>
<ul>
  <li><Link href="/">Home</Link></li>
  <li><Link href="/profile">My Profile</Link></li>
  <li><Link href="/community">Resources</Link></li>
  <li><Link href="/contact">Contact Us</Link></li>
</ul>
        </div>

        <div className="footer-section footer-links">
<h4>Cyber Awareness</h4>
<ul>
  <li><a href="/safety-tips">Safety Tips</a></li>
  <li><a href="/reporting-guide">Reporting Guide</a></li>
  <li><a href="/learn-more">Learn More</a></li>
</ul>
        </div>

        {/* Support & Help */}
        <div className="footer-section footer-links">
          <h4>Support & Help</h4>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/helpline">Helpline Numbers</a></li>
            <li><a href="/feedback">Feedback</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-conditions">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CyberSaathi. All rights reserved.</p>
        <p>Stay alert. Stay safe. Build your cyber resilience with CyberSaathi.</p>
      </div>
    </footer>
  );
};

export default Footer;
