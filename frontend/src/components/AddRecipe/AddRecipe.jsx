import React from "react";
import "./AddRecipe.scss";
import { Link } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";

function AddRecipe() {
  return (
    <div className="add-recipe">
      <div className="add-heading">
        <h1>Create new recipe</h1>
        <Link to="/test" className="btn bg-primary text-white links-fix ">
          Next
        </Link>
      </div>
      <div className="add-form">
        <RecipeForm />
      </div>
    </div>
  );
}

export default AddRecipe;
