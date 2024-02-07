import React from "react";
import "./ExploreRecipes.scss";
import { Link } from "react-router-dom";
import RecipesCard from "../RecipesCard/RecipesCard";

function ExploreRecipes() {
  return (
    <div className="explore-recipes">
      <div className="common-heading">
        <h1 className="text-black font-48">Explore Recipes</h1>
        <span className="text-primary"><Link to="/recipe" className="text-primary links-fix">View more</Link></span>
      </div>
      <RecipesCard />
    </div>
  );
}

export default ExploreRecipes;
