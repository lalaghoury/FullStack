import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "antd";
import Comments from "./Comments";

const CommentsSection = ({ Id }) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState("");
    const userId = localStorage.getItem("userId");      

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:5000/comments/${Id}`
            );
            setComments(response.data.reverse());
        } catch (error) {
            console.error("Fetching data failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Fetch data once when component mounts

    const onUpdateComments = () => {
        fetchData(); // Call fetchData to update comments
    };

    const handleAdd = () => {
        let newComment = {
            content: commentBody,
            author: userId,
            postId: Id
        };
        axios
            .post("http://localhost:5000/comments", newComment)
            .then((response) => {
                console.log(response.data);
                setCommentBody(""); // Clear input after successful addition
                onUpdateComments(); // Fetch data again to update comments
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="App">
            <div className="comment-container">
                <Input
                    type="text"
                    placeholder="Add a comment"
                    className="input"
                    autoFocus
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                />
                <Button className="button" onClick={handleAdd}>
                    Add
                </Button>
            </div>
            <div>
                {comments.map((comment) => (
                    <Comments
                        key={comment._id}
                        comments={comment}
                        setComments={setComments}
                        onUpdateComments={onUpdateComments}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
