import React, { useState } from "react";
import { Button } from "antd";
import "./comments.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const Comments = ({ comments, onUpdateComments, used }) => {
    const [showInput, setShowInput] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const userId = localStorage.getItem("userId");

    const handleReply = (commentId) => {
        setShowInput(true);
        let newComment = {
            content: commentBody,
            author: userId,
            model: used,
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

    const handleUpdate = (commentId) => {
        axios
            .put(`http://localhost:5000/comments/${commentId}`, { content: commentBody, updatedAt: new Date() })
            .then((response) => {
                onUpdateComments(); // Fetch updated comments after update
            });
    }

    const timePassed = (createdAt) => {
        const now = new Date();
        const created = new Date(createdAt);
        const seconds = Math.round((now - created) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            return `${days} days ago`;
        }
    };

    return (
        <div>
            <div className={`${comments.content && "comment-container"}`}>
                <div style={{ display: 'flex', gap: 10 }}>
                    <span><img src={comments.author.userimage} alt="" /></span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <span style={{ display: 'flex', gap: 10, alignSelf: "flex-start" }}>
                            <span style={{ fontWeight: '600' }}>
                                <Link style={{ alignSelf: "flex-start" }} className="links-fix text-black" to={`/user/${comments.author._id}`}>{comments.author.username}</Link>
                            </span>
                            <span>
                                <span>{comments.updatedAt ? `edited ${timePassed(comments.updatedAt)}` : timePassed(comments.createdAt)}</span>
                            </span>
                        </span>
                        <span style={{ fontWeight: '400' }}><p>{comments.content}</p></span>
                        {showInput && (
                            <TextArea
                                type="text"
                                placeholder="Reply"
                                className="input"
                                autoFocus
                                onPressEnter={() => handleReply(comments._id)}
                                onChange={(e) => setCommentBody(e.target.value)}
                                autoSize={{ minRows: 0, maxRows: 100 }}
                                style={{ width: '100%', padding: 20 }}
                            />
                        )}
                        {showEdit && (
                            <TextArea
                                type="text"
                                className="input"
                                autoFocus
                                onPressEnter={() => handleUpdate(comments._id)}
                                value={commentBody}
                                onChange={(e) => setCommentBody(e.target.value)}
                                autoSize={{ minRows: 0, maxRows: 100 }}
                                style={{ width: '100%', padding: 20 }}
                            />
                        )}

                        {showInput && (
                            <div>
                                <Button
                                    className="button"
                                    onClick={() => handleReply(comments._id)}
                                >
                                    Reply
                                </Button>
                                <Button className="button" onClick={() => {
                                    setShowInput(false);
                                    setCommentBody("");
                                }}>
                                    Cancel
                                </Button>
                            </div>
                        )}
                        {showEdit && (
                            <div>
                                <Button
                                    className="button"
                                    onClick={() => {
                                        handleUpdate(comments._id);
                                        setShowEdit(false);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button className="button" onClick={() => {
                                    setShowEdit(false);
                                    setCommentBody(comments.content);
                                }}>
                                    Cancel
                                </Button>
                            </div>
                        )}
                        {!showInput && !showEdit && comments.content && (
                            <div>
                                <Button className="button" onClick={() => setShowInput(true)}>
                                    Reply
                                </Button>

                                {comments.author._id === userId && (
                                    <Button className="button" onClick={() => {
                                        setShowEdit(true);
                                        setCommentBody(comments.content);
                                    }}>
                                        Edit
                                    </Button>
                                )}
                                {comments.author._id === userId && (

                                    <Button
                                        className="button"
                                        onClick={() => handleDelete(comments._id)}
                                    >
                                        Delete
                                    </Button>
                                )}


                            </div>
                        )}

                    </span>
                </div>

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
