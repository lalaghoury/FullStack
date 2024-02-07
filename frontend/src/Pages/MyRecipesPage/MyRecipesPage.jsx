import React, { useCallback, useEffect, useState } from 'react';
import './MyRecipesPage.scss';
import { useFunctions } from '../../context/FunctionsSupply';
import WishlistButton from '../../components/RecipesCard/WishlistButton';
import { Link } from 'react-router-dom';
import { FireOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

function MyRecipesPage() {
    const { getUser } = useFunctions();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [cardRatings, setCardRatings] = useState({});
    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                setUser(data);
                const initialRatings = data.recipes.reduce((ratings, recipe) => {
                    ratings[recipe._id] = recipe.recipe_ratings || 0;
                    return ratings;
                }, {});
                setCardRatings(initialRatings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [getUser]);

    const handleRatingChange = useCallback((value, recipeId) => {
        if (Number.isInteger(value) && value >= 0 && value <= desc.length) {
            setCardRatings(prevRatings => ({ ...prevRatings, [recipeId]: value }));
        } else {
            console.error("Invalid rating value:", value);
        }
    }, [desc.length]);

    console.log(user)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please sign in to view your recipes</div>;
    }

    return (
        <div className="my-recipes-page">
            <h1>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s Recipes</h1>
            <div className="card-wrapper">
                {user.recipes.map((recipe) => (
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
                                <img src={user.userimage} alt={user.username} />
                                <h4>{user.username}</h4>
                            </span>
                            <span className="card-right">
                                <FireOutlined style={{ color: "red" }} />
                                <h4>{recipe.firecount}</h4>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyRecipesPage;

