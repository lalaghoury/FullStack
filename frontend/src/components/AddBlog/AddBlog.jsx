import React from 'react'
import './AddBlog.scss'
import { Link } from 'react-router-dom'
import BlogForm from '../BlogForm/BlogForm'
import AppLayout from '../../Layout/Layout'
function AddBlog() {
    return (
        <AppLayout>
            <div className="add-blog">
                <div className="add-blog-heading">
                    <h1>Create new BLog</h1>
                    <Link to="/test" className="btn bg-primary text-white links-fix ">
                        <i className="fas fa-arrow-left"></i>
                        Next
                    </Link>
                </div>
                <div className="add-blog-form">
                    <BlogForm />
                </div>
            </div>
        </AppLayout>
    )
}

export default AddBlog
