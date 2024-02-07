import React from "react";
import "./NewRecipe.scss";
import { Link } from "react-router-dom";

function NewRecipe() {
  return (
    <div className="new-recipe">
      <div className="new-recipe-image">
        <img
          src="https://i.ibb.co/YW5F1FG/new-recipe.jpg"
          alt="new-recipe"
          border="0"
        />
      </div>
      <div className="new-recipe-text tac">
        <h1 className="text-black font-48">
          Share Your <span className="text-primary">Recipes</span>
        </h1>
        <p className="text-black font-24">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vitae enim pharetra, venenatis nunc eget, finibus est. Proin velit{" "}
        </p>
        <button className="btn-primary-medium bg-primary cursor">
          <Link className="text-white links-fix" to="/add-recipe">
            Create New Recipe
          </Link>
        </button>
      </div>
    </div>
  );
}

export default NewRecipe;
