import React, { createContext, useContext } from "react";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/signout');
            if (response.data.success) {
                localStorage.removeItem("auth");
                localStorage.removeItem("userId");
                localStorage.setItem("loggedIn", false);
                message.success(response.data.message, 2);
                setAuth({
                    ...auth,
                    user: null,
                    token: ''
                })
                // setInterval(() => {
                //     navigate('/login')
                // }, 500)
            }
        } catch (error) {
            console.log(error.response.data.message);
            message.error(error.response.data.message, 3);
        }
    };

    const handleUserActivity = async () => {
        if (auth?.user) {
            try {
                axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;
                const response = await axios.get("http://localhost:5000/verify");
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
    }

    const loginCheck = () => {
        if (localStorage.getItem("loggedIn") === "false") {
            return false;
        } else {
            return true;
        }
    }

    return (
        <AccountContext.Provider value={{ handleSignout, loginCheck, handleUserActivity }}>
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
