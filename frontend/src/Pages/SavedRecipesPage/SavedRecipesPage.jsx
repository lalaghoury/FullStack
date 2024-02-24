import React, { useCallback, useEffect, useState } from 'react'
import './SavedRecipesPage.scss'
import { useFunctions } from '../../context/FunctionsSupply';
import { FireOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Empty, Rate } from "antd";
import WishlistButton from "../../../src/components/RecipesCard/WishlistButton";
import { useAuth } from '../../context/AuthContext';

function SavedRecipesPage() {
    const { getAllRecipes } = useFunctions();
    const [allRecipes, setAllRecipes] = useState([]);
    const [cardRatings, setCardRatings] = useState({});
    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const data = await getAllRecipes();
            const savedRecipes = data.filter(recipe => recipe.saves.includes(auth.user._id));
            setAllRecipes(savedRecipes);
            const initialRatings = data.reduce((ratings, recipe) => {
                ratings[recipe._id] = recipe.recipe_ratings || 0;
                return ratings;
            }, {});
            setCardRatings(initialRatings);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleRatingChange = useCallback((value, recipeId) => {
        if (Number.isInteger(value) && value >= 0 && value <= desc.length) {
            setCardRatings(prevRatings => ({ ...prevRatings, [recipeId]: value }));
        } else {
            console.error("Invalid rating value:", value);
        }
    }, [desc.length]);

    if (loading) return <div>Loading...</div>

    const onAction = () => {
        fetchRecipes();
    }



    return (
        <div className="saved-recipes-page">
            <div className="breadcrumb">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: 'Home',
                            href: '/',
                            className: 'bold',
                        },
                        {
                            title: 'Saved Recipes',
                            href: '#',
                            className: 'bold',
                        },
                    ]}
                />
            </div>
            <div>
                <h1>Saved Recipes</h1>
            </div>
            <div className="card-wrapper">
                {allRecipes && allRecipes.length > 0 ? (allRecipes.map((recipe) => (
                    <div key={recipe._id} className="card">
                        <div className="card-parent">
                            <div className="card-parent-img">
                                <img src={recipe.recipe_imageurl} alt={recipe.recipe_title} className="card-image" />
                            </div>
                            <WishlistButton saves={recipe.saves} recipeId={recipe._id} onAction={onAction} />
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
                ))) : (
                    <div className="empty-recipes-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: '0 auto', width: '100%' }}>
                        <Empty
                            description={
                                <span>
                                    No recipes to display
                                </span>
                            }
                        />
                        <div className="empty-recipes-actions" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                            <Button className='disable-hover bold text-black'>
                                <Link to="/recipe">Browse recipes</Link>
                            </Button>
                            <Button className='disable-hover bold text-black'>
                                <Link to={`/user/${auth.user._id}`}>Go back to profile</Link>
                            </Button>
                            <Button type="dashed" className='disable-hover bold text-black'>
                                <Link to={`/add-recipe`}>Add Your Recipe Now!</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedRecipesPage