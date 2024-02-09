import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useComments } from './context/CommentsContext';
import { useFunctions } from './context/FunctionsSupply';
import { Input, Button } from 'antd';
const { useParams, Link } = require("react-router-dom");



function PostList({ blog_id }) {
    const userId = localStorage.getItem('userId');
    const { getSingleBlog } = useFunctions();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const { addComment } = useComments();

    useEffect(() => {
        setLoading(true)
        getSingleBlog(blog_id).then((data) => {
            setBlog(data)
            setComments(data.comments)
        }).catch((error) => {
            console.log(`err effect`, error)
        }).finally(() => {
            setLoading(false)
        })
    }, [blog_id, setBlog, setComments, getSingleBlog])

    console.log(blog, comments)

    if (loading) return <div>Loading...</div>

    if (!blog) return <div>Blog not found</div>

    return (
        <div style={{ padding: 15 }}>
            <h1>{blog.title}</h1>
            {comments.map(comment => (
                <div key={comment._id} style={{ marginBottom: '1rem' }}>
                    <Comment comment={comment} blog_id={blog._id} userId={userId} />
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="replies" style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column-reverse' }}>
                            {comment.replies.map(reply => (
                                <div key={reply._id} className="reply">
                                    <ReplyCard comment={reply} blog_id={blog._id} commentId={comment._id} userId={userId} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}


            {/* Add Comment */}
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <Input placeholder='Add a comment' value={text} onChange={(e) => setText(e.target.value)} />
                <Button onClick={() => addComment(blog_id, text, userId)}>Post</Button>
            </div>
        </div >
    )
}

const Comment = ({ comment, blog_id, userId }) => {
    const { addComment, editComment, deleteComment, replyToComment, replyToReply, deleteReply, getComments } = useComments();
    const [showReply, setShowReply] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [editText, setEditText] = useState(comment.message)

    return (
        <div className="comment" style={{ width: '100%', padding: 15, display: 'flex', flexDirection: 'column', gap: 15, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={comment.user.userimage} alt="" />
                    <h5><Link className="links-fix text-black" to={`/user/${comment.user._id}`}>{comment.user.username}</Link></h5>
                    <i>posted on {new Date(comment.date).toLocaleDateString()}</i>
                </span>
                <span>
                    {userId === comment.user._id ? (
                        /*  Buttons for  Edit and Delete Comments */
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button onClick={() => setShowEdit(true)}>Edit</Button>
                            <Button onClick={() => deleteComment(blog_id, comment._id)}>Delete</Button>
                        </div>
                    ) : <Button onClick={() => setShowReply(!showReply)}>{showReply ? 'Cancel' : 'Reply'}</Button>}
                </span>
            </div>
            <p>{comment.message}</p>
            <div>
                {/* Rply Comment */}
                {showReply && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Input placeholder='Add a reply' value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                        <Button style={{ marginTop: 10, alignSelf: 'flex-end' }} onClick={() => replyToComment(blog_id, comment._id, replyText, userId)}>Post Reply</Button>
                    </div>
                )}

                {/* Edit Comment */}
                {showEdit && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Input
                            type='text'
                            style={{ width: '100%' }}
                            placeholder='Edit comment'
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <Button style={{ marginTop: 10, alignSelf: 'flex-end' }} onClick={() => editComment(blog_id, comment._id, editText)}>Edit Comment</Button>
                    </div>
                )}
            </div>

        </div >
    );
};

const ReplyCard = ({ comment, blog_id, userId, commentId }) => {
    const { addComment, editComment, deleteComment, replyToComment, replyToReply, deleteReply, getComments } = useComments();
    const [showReply, setShowReply] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [editText, setEditText] = useState(comment.message)

    return (
        <div className="comment" style={{ width: '100%', padding: 15, display: 'flex', flexDirection: 'column', gap: 15, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={comment.user.userimage} alt="" />
                    <h5><Link className="links-fix text-black" to={`/user/${comment.user._id}`}>{comment.user.username}</Link></h5>
                    <i>posted on {new Date(comment.date).toLocaleDateString()}</i>
                </span>
                <span>
                    {userId === comment.user._id ? (
                        /*  Buttons for  Edit and Delete Comments */
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button onClick={() => setShowEdit(true)}>Edit</Button>
                            <Button onClick={() => deleteComment(blog_id, comment._id)}>Delete</Button>
                        </div>
                    ) : <Button onClick={() => setShowReply(!showReply)}>{showReply ? 'Cancel' : 'Reply'}</Button>}
                </span>
            </div>
            <p>{comment.message}</p>
            <div>
                {/* Rply Comment */}
                {showReply && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Input placeholder='Add a reply' value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                        <Button style={{ marginTop: 10, alignSelf: 'flex-end' }} onClick={() => replyToReply(blog_id, commentId, comment._id, replyText, userId)}>Post Reply</Button>
                    </div>
                )}

                {/* Edit Comment */}
                {showEdit && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Input
                            type='text'
                            style={{ width: '100%' }}
                            placeholder='Edit comment'
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <Button style={{ marginTop: 10, alignSelf: 'flex-end' }} onClick={() => editComment(blog_id, comment._id, editText)}>Edit Comment</Button>
                    </div>
                )}
            </div>

        </div >
    );
}



export default PostList;
