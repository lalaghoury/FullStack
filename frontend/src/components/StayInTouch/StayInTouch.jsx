import React from "react";
import "./StayInTouch.scss";

function StayInTouch() {
  return (
    <div className="stay-in-touch-container">
      <h1 className="font-48">Let’s Stay In Touch!</h1>
      <p className="font-32 text-grey">
        Join our newsletter, so that we reach out to you with our news and
        offers.
      </p>
      <div className="stay-in-wrap">
        <input type="text" placeholder="Enter your email" />
        <button className="btn-primary-small text-white cursor">Subscribe</button>
      </div>
    </div>
  );
}

export default StayInTouch;
