import React, { useEffect, useState } from "react";
import "../RecipesCard/RecipesCard.scss";
import { FireOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Flex, Rate } from "antd";
import WishlistButton from "../RecipesCard/WishlistButton";
import { useFunctions } from "../../context/FunctionsSupply";

function Test() {
  const { getAllRecipes } = useFunctions();
  const [allRecipes, setAllRecipes] = useState([]);
  useEffect(() => {
    getAllRecipes()
      .then((data) => setAllRecipes(data))
      .catch((error) => console.log(error));
  }, []);
  const [cardRatings, setCardRatings] = useState({});
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
  const handleRatingChange = (value, recipe_id) => {
    setCardRatings((prevRatings) => ({ ...prevRatings, [recipe_id]: value }));
  };
  useEffect(() => {
    const initialRatings = {};
    allRecipes.forEach((recipe) => {
      initialRatings[recipe._id] = recipe.recipe_ratings;
    });
    setCardRatings(initialRatings);
  }, [allRecipes]);

  return (
    <div className="card-wrapper">
      {allRecipes.map((recipe) =>
        <div key={recipe._id} className="card">
          <div className="card-parent">
            <div className="card-parent-img">
              <img src={recipe.recipe_imageurl} alt={recipe.recipe_title} className="card-image" />
            </div>
            <WishlistButton />
            <div className="card-rating">
              <Flex gap="middle" vertical >
                <Rate
                  style={{ fontSize: 22, color: "#B55D51" }}
                  tooltips={desc}
                  onChange={(value) => handleRatingChange(value, recipe._id)}
                  value={cardRatings[recipe._id]}
                />
              </Flex>
            </div>
          </div>
          <h3 className="font-16"><Link className="links-fix text-black" to={`/recipe/${recipe._id}`}>{recipe.recipe_title}</Link></h3>
          <div className="card-user">
            <span className="card-left">
              <img src={recipe.userimage} alt="" />
              <h4>{recipe.user.username}</h4>
            </span>
            <span className="card-right">
              <FireOutlined style={{ color: "red" }} />
              <h4>{recipe.firecount}</h4>
            </span>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default Test;