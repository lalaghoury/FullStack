import React, { useEffect, useState, useCallback } from "react";
import "./RecipesCard.scss";
import { FireOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import WishlistButton from "./WishlistButton";
import { useFunctions } from "../../context/FunctionsSupply";

function RecipesCard() {
  const { getAllRecipes } = useFunctions();
  const [allRecipes, setAllRecipes] = useState([]);
  const [cardRatings, setCardRatings] = useState({});
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setAllRecipes(data);
        const initialRatings = data.reduce((ratings, recipe) => {
          ratings[recipe._id] = recipe.recipe_ratings || 0;
          return ratings;
        }, {});
        setCardRatings(initialRatings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, [getAllRecipes]);

  const handleRatingChange = useCallback((value, recipeId) => {
    if (Number.isInteger(value) && value >= 0 && value <= desc.length) {
      setCardRatings(prevRatings => ({ ...prevRatings, [recipeId]: value }));
    } else {
      console.error("Invalid rating value:", value);
    }
  }, [desc.length]);

  return (
    <div className="card-wrapper">
      {allRecipes.map((recipe) => (
        <div key={recipe._id} className="card">
          <div className="card-parent">
            <div className="card-parent-img">
              <img src={recipe.recipe_imageurl} alt={recipe.recipe_title} className="card-image" />
            </div>
            <WishlistButton />
            <div className="card-rating">
              <Rate
                style={{ fontSize: 22, color: "#B55D51" }}
                tooltips={desc}
                onChange={(value) => handleRatingChange(value, recipe._id)}
                value={cardRatings[recipe._id] || 0}
              />
            </div>
          </div>
          <h3 className="font-16">
            <Link className="links-fix text-black" to={`/recipe/${recipe._id}`}>{recipe.recipe_title}</Link>
          </h3>
          <div className="card-user">
            <span className="card-left">
              <img src={recipe.user.userimage} alt={recipe.user.username} />
              <h4><Link className="links-fix text-black" to={`/user/${recipe.user._id}`}>{recipe.user.username}</Link></h4>
            </span>
            <span className="card-right">
              <FireOutlined style={{ color: "red" }} />
              <h4>{recipe.firecount}</h4>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipesCard;

