import React, { useState } from "react";
import { Button, Input } from "antd";
import "./comments.css";
import axios from "axios";

const Comments = ({ comments, onUpdateComments }) => {
    const [showInput, setShowInput] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const userId = localStorage.getItem("userId");

    const handleReply = (commentId) => {
        setShowInput(true);
        let newComment = {
            content: commentBody,
            author: userId,
        };
        console.log(newComment);
        axios
            .post(`http://localhost:5000/comments/${commentId}/reply`, newComment)
            .then((response) => {
                onUpdateComments(); // Fetch updated comments after replying
            })
            .catch((error) => {
                console.log(error);
            });
        setCommentBody("");
    };

    const handleDelete = (commentId) => {
        axios
            .delete(`http://localhost:5000/comments/${commentId}`)
            .then((response) => {
                onUpdateComments(); // Fetch updated comments after deletion
            });
    };

    return (
        <div>
            <div className={`${comments.content && "comment-container"}`}>
                <h3>{comments.content}</h3>
                {showInput && (
                    <Input
                        type="text"
                        placeholder="Reply"
                        className="input"
                        autoFocus
                        onChange={(e) => setCommentBody(e.target.value)}
                    />
                )}
                {showInput ? (
                    <div>
                        <Button
                            className="button"
                            onClick={() => handleReply(comments._id)}
                        >
                            Reply
                        </Button>
                        <Button className="button" onClick={() => setShowInput(false)}>
                            Cancel
                        </Button>
                    </div>
                ) : comments.content ? (
                    <div>
                        <Button className="button" onClick={() => setShowInput(true)}>
                            Reply
                        </Button>
                        <Button
                            className="button"
                            onClick={() => handleDelete(comments._id)}
                        >
                            Delete
                        </Button>
                    </div>
                ) : null}
            </div>
            <div style={{ paddingLeft: 30 }}>
                {comments?.replies?.map((comment) => (
                    <Comments
                        key={comment._id}
                        comments={comment}
                        onUpdateComments={onUpdateComments}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;
