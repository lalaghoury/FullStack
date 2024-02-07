import React from "react";
import "./CategoriesPage.scss";
import { Breadcrumb } from "antd";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";

function CategoryPage() {
  return (
    <div className="category-page">
      <Breadcrumb
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
        ]}
      />
      <CategoriesCard />
      <CategoriesCard />
    </div>
  );
}

export default CategoryPage;
