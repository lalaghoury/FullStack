import React from 'react'
import './AddBlog.scss'
import { Link } from 'react-router-dom'
import BlogForm from '../BlogForm/BlogForm'
function AddBlog() {
    return (
        <div className="add-blog">
            <div className="add-blog-heading">
                <h1>Create new BLog</h1>
                <Link to="/test" className="btn bg-primary text-white links-fix ">
                    Next
                </Link>
            </div>
            <div className="add-blog-form">
                <BlogForm />
            </div>
        </div>
    )
}

export default AddBlog