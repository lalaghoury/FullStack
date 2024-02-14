import React from "react";
import Recipes from "../../components/Recipes/Recipes";


function AllRecipesPage() {
  return <div className="all-recipes-page">
    
    <Recipes slice={0} />
  </div>;
}

export default AllRecipesPage;
