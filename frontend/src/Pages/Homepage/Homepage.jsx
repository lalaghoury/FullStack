import React from "react";
import Herosection from "../../components/HeroSection/Herosection";
import "./HomePage.scss";
import NewRecipe from "../../components/NewRecipe/NewRecipe";
import TrendingRecipe from "../../components/TrendingRecipe/TrendingRecipe";
import { Blog } from "../../components/Blog/Blog";
import ExploreRecipes from "../../components/ExploreRecipes/ExploreRecipes";
import StayInTouch from "../../components/StayInTouch/StayInTouch";
import Categories from "../../components/Categories/Categories";
import Logos from "../../components/Logos/Logos";


function Homepage() {



  return (
    <div>
      <Herosection />
      <NewRecipe />
      <TrendingRecipe slice={6} userShow={false} />
      <Blog slice={2} />
      <ExploreRecipes slice={6} userShow={false} />
      <StayInTouch />
      <Categories />
      <Logos />
    </div>
  );
}

export default Homepage;
