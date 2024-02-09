import React, { useEffect } from "react";
import Herosection from "../../components/HeroSection/Herosection";
import "./HomePage.scss";
import NewRecipe from "../../components/NewRecipe/NewRecipe";
import TrendingRecipe from "../../components/TrendingRecipe/TrendingRecipe";
import { Blog } from "../../components/Blog/Blog";
import ExploreRecipes from "../../components/ExploreRecipes/ExploreRecipes";
import StayInTouch from "../../components/StayInTouch/StayInTouch";
import Categories from "../../components/Categories/Categories";
import Logos from "../../components/Logos/Logos";
import axios from "axios";
import { message } from "antd";
import { useAccount } from "../../context/AccountContext";

function Homepage() {
  const { handleUserActivity } = useAccount()
  axios.defaults.withCredentials = true;

  useEffect(() => {
    handleUserActivity().then((formattedUsername) => {
      if (formattedUsername) {
        message.success(<>Welcome <b> {formattedUsername}</b> !</>, 2);
      }
    });
  }, []);
  return (
    <div>
      <Herosection />
      <NewRecipe />
      <TrendingRecipe />
      <Blog slice={2} />
      <ExploreRecipes />
      <StayInTouch />
      <Categories />
      <Logos />
    </div>
  );
}

export default Homepage;
