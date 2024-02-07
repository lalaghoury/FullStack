import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const FunctionSupplyContext = createContext();

export const FunctionSupplyProvider = ({ children }) => {

    const getAllRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recipe');
            const allRecipes = response.data;
            return allRecipes;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/category');
            const allCategories = response.data;
            return allCategories;
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.get(`http://localhost:5000/user/${userId}`);
            const user = response.data;
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    const getSingleCategory = async (category_id) => {
        try {
            const response = await axios.get(`http://localhost:5000/category/${category_id}`);
            const category = response.data;
            return category;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/blog');
            const allBlogs = response.data;
            return allBlogs;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FunctionSupplyContext.Provider value={{ getAllBlogs, getSingleCategory, getAllRecipes, getAllCategories, getUser, }}>
            {children}
        </FunctionSupplyContext.Provider >
    );
}

export const useFunctions = () => {
    const context = useContext(FunctionSupplyContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
