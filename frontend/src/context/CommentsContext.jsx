import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);


    const getComments = async (blogID) => {
        try {
            const response = await axios.get(`http://localhost:5000/blog/${blogID}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Function to add a new comment to a blog
    const addComment = async (blogID, message, user) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/blog/${blogID}/comments`,
                { message, user }
            );
            console.log(response.data);
            return response.data; // Return the newly added comment
        } catch (error) {
            console.error(error);
            throw new Error("Failed to add comment");
        }
    };

    // Function to edit an existing comment
    const editComment = async (blogID, commentID, updatedMessage) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/blog/${blogID}/comments/${commentID}`,
                { message: updatedMessage }
            );
            console.log(response.data);
            return response.data; // Return the updated comment
        } catch (error) {
            console.error(error);
            throw new Error("Failed to edit comment");
        }
    };


    // Function to delete a comment
    const deleteComment = async (blogID, commentID) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/blog/${blogID}/comments/${commentID}`
            );
            console.log(response.data);
            return response.data; // Return success message
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete comment");
        }
    };

    // Function to reply to a comment
    const replyToComment = async (blogID, commentID, message, user) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/blog/${blogID}/comments/${commentID}/reply`,
                { message, user }
            );
            console.log(response.data);
            return response.data; // Return the newly added reply
        } catch (error) {
            console.error(error);
            throw new Error("Failed to reply to comment");
        }
    };

    // Function to reply to a reply
    const replyToReply = async (blogID, commentID, replyID, message, user) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/blog/${blogID}/comments/${commentID}/replies/${replyID}/reply`,
                { message, user }
            );
            console.log(response.data);
            return response.data; // Return the newly added reply to the reply
        } catch (error) {
            console.error(error);
            throw new Error("Failed to reply to reply");
        }
    };

    const deleteReply = async (blogID, commentID, replyID) => {
        try {
            const response = await axios.delete(`http://localhost:5000/blog/${blogID}/comments/${commentID}/replies/${replyID}`);
            console.log(response.data);
            return response.data; // Return success message
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete reply");
        }
    };


    return (
        <CommentsContext.Provider value={{ addComment, editComment, deleteComment, replyToComment, replyToReply, deleteReply, getComments }}>
            {children}
        </CommentsContext.Provider>
    );
};

export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error("useComments must be used within a CommentsProvider");
    }
    return context;
};
