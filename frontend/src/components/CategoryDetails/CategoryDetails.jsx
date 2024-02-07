import React, { useEffect, useState, useCallback } from 'react';
import './CategoryDetails.scss';
import { Link, useParams } from 'react-router-dom';
import { useFunctions } from '../../context/FunctionsSupply';
import { FireOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider, Rate, Select } from 'antd';
import WishlistButton from '../RecipesCard/WishlistButton';

function CategoryDetails() {
    const { category_id } = useParams();
    const { getSingleCategory, getAllCategories } = useFunctions();
    const [category, setCategory] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cardRatings, setCardRatings] = useState({});
    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

    const fetchCategory = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllCategories();
            setAllCategories(res);
            const singleCategory = await getSingleCategory(category_id);
            setCategory(singleCategory);
            const initialRatings = data.recipes.reduce((ratings, recipe) => {
                ratings[recipe._id] = recipe.recipe_ratings || 0;
                return ratings;
            }, {});
            setCardRatings(initialRatings);
        } catch (error) {
            console.error("Failed to fetch category:", error);
        } finally {
            setLoading(false);
        }
    }, [category_id, getSingleCategory]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const handleRatingChange = (value, recipe_id) => {
        if (Number.isInteger(value) && value >= 0 && value <= desc.length) {
            setCardRatings(prevRatings => ({ ...prevRatings, [recipe_id]: value }));
        } else {
            console.error("Invalid rating value:", value);
        }
    };

    if (loading) return <h1>Loading...</h1>;

    if (!category) {
        return <h1>Category not found</h1>;
    }

    return (
        <div className="category-details">
            <div className="breadcrumb">
                <Breadcrumb
                    className='breadcrumb'
                    separator=">"
                    items={[
                        {
                            title: 'Home',
                            href: '/',
                            className: 'bold',
                        },
                        {
                            title: 'Categories',
                            href: '/category',
                            className: 'bold',
                        },
                        {
                            title: category.categoryname,
                            href: `/category/${category._id}`,
                            className: 'bold',
                        }
                    ]}
                />
            </div>
            <div className="category-details-heading">
                <h1 className="text-black font-48">{category.categoryname}</h1>
                <span className="bold">
                    Category:
                    <Select className="dropdown antd-form-input" value={category_id} placeholder="Relevance"
                        style={{ width: 200, color: '#b55d51f7' }}>
                        {allCategories.map(category => (
                            <Select.Option className="dropdown" key={category._id} value={category._id}>
                                <Link
                                    className="links-fix text-primary disable-hover-anchor"
                                    to={`/category/${category._id}`}
                                >
                                    {category.categoryname}
                                </Link>
                            </Select.Option>
                        ))}
                    </Select>
                </span>
            </div>
            <Divider />
            <div className="category-display">
                <div className="card-wrapper">
                    {category.recipes.map(recipe => (
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
                                        onChange={value => handleRatingChange(value, recipe._id)}
                                        value={cardRatings[recipe._id]}
                                    />
                                </div>
                            </div>
                            <h3 className="font-16">
                                <Link className="links-fix text-black" to={`/recipe/${recipe._id}`}>{recipe.recipe_title}</Link>
                            </h3>
                            <div className="card-user">
                                <span className="card-left">
                                    <img src={recipe.user.userimage} alt="" />
                                    <h4>
                                        <Link className="links-fix text-black" to={`/user/${recipe.user._id}`}>{recipe.user.username}</Link>
                                    </h4>
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
        </div>
    );
}

export default CategoryDetails;

