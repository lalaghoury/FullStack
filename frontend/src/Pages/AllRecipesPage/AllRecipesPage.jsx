import React from "react";
import Recipes from "../../components/Recipes/Recipes";


function AllRecipesPage() {
  return <div className="all-recipes-page">
    <Recipes slice={0} userShow={true} />
  </div>;
}

export default AllRecipesPage;
