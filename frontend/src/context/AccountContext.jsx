import React, { createContext, useContext, useState } from "react";
import { message } from "antd";
import axios from "axios";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {


    const handleSignup = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/signup', values);
            const data = response.data;
            if (data.success) {
                message.success(data.success, 3, () => {
                    window.location.href = "/login";
                });
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/login', values);
            const data = response.data;
            if (data.success) {
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("loggedIn", true);
                message.success(data.success, 2);
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleSignout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/signout');
            console.log(`Signout ho gaya`);
            if (response.data.success) {
                localStorage.removeItem("userId");
                localStorage.setItem("loggedIn", false); message.success(response.data.success, 2, () => {
                    window.location.href = "/login";
                });
            }
        } catch (error) {
            console.error("Signout failed:", error);
        }
    };

    const handleUserActivity = async () => {
        try {
            const response = await axios.get("http://localhost:5000/");
            if (response.data.success) {
                console.log(`User is verified`);
                const formattedUsername = response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1);
                return formattedUsername;
            }
        } catch (error) {
            console.log(`User not verified`);
            console.error(error);
        }
    }
    const loginCheck = () => {
        if (localStorage.getItem("loggedIn") === "false") {
            return false;
        } else {
            return true;
        }
    }

    return (
        <AccountContext.Provider value={{ handleSignup, handleSignout, handleLogin, loginCheck, handleUserActivity }}>
            {children}
        </AccountContext.Provider >
    );
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
