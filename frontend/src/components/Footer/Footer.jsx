import React from "react";
import "./Footer.scss";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-wrapper">
          <div className="footer-text">
            <Logo />
            <p className="text-black font-16 text-grey">
              The purpose of lorem ipsum is to create a natural looking block of
              text (sentence, paragraph, page, etc.) that doesn't distract from
              the layout.
            </p>
          </div>
          <div className="footer-links">
            <div className="content">
              <h1 className="text-black bold font-16">Links</h1>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/">Home</Link></p>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/recipe">Recipe</Link></p>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/blog">Blog</Link></p>
            </div>
            <div className="content">
              <h1 className="bold text-black font-16">Links</h1>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/add-recipe">Share Recipe</Link></p>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/about">About Us</Link></p>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/contact">Contact</Link></p>
            </div>
            <div className="content">
              <h1 className="bold text-black font-16">Legal</h1>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/">Home</Link></p>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/privacy">Privacy & Policy</Link></p>
              <p className="text-black font-16 text-grey"><Link className="text-grey links-fix f-l" to="/cookies">Cookies</Link></p>
            </div>
          </div>
          <div className="footer-letter">
            <h1 className="text-black font-48">Newsletter</h1>
            <p className="text-black font-16">
              Subscribe to our newsletter to get more free tip{" "}
            </p>
            <input className="no-outline" type="text" placeholder="Enter your email address" />

            <button className="btn-primary-medium bg-primary cursor text-white">Subscribe</button>
          </div>
        </div>
        <hr />
        <div className="footer-disclaimer">
          <p>Copyright © 2022. All Rights Reserved.</p>
          <div className="social-links">
            <img
              src="https://i.ibb.co/9yCd0cb/s-homepage-social-media-icon.png"
              alt="logos image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
