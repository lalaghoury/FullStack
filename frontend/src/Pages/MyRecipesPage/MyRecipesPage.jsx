import React, { useCallback, useEffect, useState } from 'react';
import './MyRecipesPage.scss';
import { useFunctions } from '../../context/FunctionsSupply';
import WishlistButton from '../../components/RecipesCard/WishlistButton';
import { Link } from 'react-router-dom';
import { FireOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Empty, Rate } from 'antd';
import { useAuth } from '../../context/AuthContext';
import AppLayout from '../../Layout/Layout';
import RecipesCard from '../../components/RecipesCard/RecipesCard';

const MyRecipesPage = () => {
    const { getUser } = useFunctions();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [cardRatings, setCardRatings] = useState({});
    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
    const { auth } = useAuth();

    const onAction = () => {
        console.log('hey')
    }

    useEffect(() => {
        setLoading(true);
        getUser(auth?.user._id)
            .then(data => {
                setUser(data);
                const initialRatings = data.recipes?.reduce((ratings, recipe) => {
                    ratings[recipe._id] = recipe.recipe_ratings || 0;
                    return ratings;
                }, {});
                setCardRatings(initialRatings);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, [getUser, auth?.user._id]);

    const handleRatingChange = useCallback((value, recipeId) => {
        if (Number.isInteger(value) && value >= 0 && value < desc.length) {
            setCardRatings(prevRatings => ({ ...prevRatings, [recipeId]: value }));
        } else {
            console.error("Invalid rating value:", value);
        }
    }, [desc.length]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please sign in to view your recipes</div>;
    }

    return (
        <AppLayout>
            <div className="my-recipes-page">
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
                                title: 'My Recipes',
                                href: '#',
                                className: 'bold',
                            },
                        ]}
                    />
                </div>
                <h1>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s Recipes</h1>

                <div>
                    <RecipesCard data={user.recipes} userShow={true} />
                </div>
                {/* <div className="card-wrapper">
                    {user.recipes && user.recipes.length > 0 ? (
                        user.recipes.map((recipe) => (
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
                                        <img src={user.userimage} alt={user.username} />
                                        <h4>{user.username}</h4>
                                    </span>
                                    <span className="card-right">
                                        <FireOutlined style={{ color: "red" }} />
                                        <h4>{recipe.firecount}</h4>
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
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
                                    <Link to="/recipes">Browse recipes</Link>
                                </Button>
                                <Button className='disable-hover bold text-black'>
                                    <Link to={`/user/${user._id}`}>Go back to profile</Link>
                                </Button>
                                <Button type="dashed" className='disable-hover bold text-black'>
                                    <Link to={`/add-recipe`}>Add Your Recipe Now!</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div> */}
            </div>
        </AppLayout>
    );
}

export default MyRecipesPage;
