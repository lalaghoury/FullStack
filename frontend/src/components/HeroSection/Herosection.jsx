import React from "react";
import "./HeroSection.scss";
import { Link } from "react-router-dom";
import { useAccount } from "../../context/AccountContext";

function Herosection() {
  const { loginCheck } = useAccount();
  const user = loginCheck();
  return (
    <div className="hero-container">
      <div className="hero-section-text">
        <div className="text-h">
          <h1 className="font-64">Your Daily Dish</h1>
          <h1 className="font-64">
            A <span className="text-primary">Food</span> Journey
          </h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vitae enim pharetra, venenatis nunc eget, finibus est. Proin velit{" "}
        </p>
        
        {user ? (
          <> <button className="btn-primary-medium bg-primary cursor"><Link className="text-white links-fix" to="/signup">Get Started</Link></button></>
        ) : (
          <>
            <div className="btn-h">
              <button className="btn bg-grey bg-primary dis cursor"><Link className="text-black links-fix" to="/login">Log in</Link></button>
              <button className="btn-primary-medium bg-primary cursor"><Link className="text-white links-fix" to="/signup">Sign up</Link></button>
            </div>
            <p className="p-h ">
              Do you have account?{" "}
              <Link className="text-primary links-fix" to="/login">
                Log in
              </Link>
            </p>
          </>
        )}

      </div>
      <div className="hero-section-image">
        <img
          src="https://i.ibb.co/VjWm0zC/food.png"
          alt="food"
          border="0"
        ></img>
      </div>
    </div>
  );
}

export default Herosection;
