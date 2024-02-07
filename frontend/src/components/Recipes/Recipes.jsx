import React, { useState } from "react";
import "./Recipes.scss";
import { Breadcrumb, Divider, Select } from "antd";
import RecipesCard from "../RecipesCard/RecipesCard";


function Recipes() {
  const [next, setNext] = useState(false);
  return (
    <div className="recipes">
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
              title: 'Recipes',
              href: '/recipe',
              className: 'bold',
            },
          ]}
        />
      </div>
      <div className="recipes-heading">
        <h1 className="text-black font-48">Recipes</h1>
        <span className="text-black bold">
          Sort By:
          <Select className="dropdown antd-form-input" onChange={() => setNext(!next)} placeholder="Relevance" 
            style={{ width: 200, color: '#b55d51f7' }}>
            <Select.Option className="dropdown bold" style={{ color: '#b55d51f7' }} value="Relevance">Relevance</Select.Option>
            <Select.Option className="dropdown bold" style={{ color: '#b55d51f7' }} value="Newest">Newest</Select.Option>
            <Select.Option className="dropdown bold" style={{ color: '#b55d51f7' }} value="Top-Rated">Top Rated</Select.Option>
          </Select>
        </span>
      </div>
      <Divider />
      <RecipesCard />
    </div>
  );
}

export default Recipes;
