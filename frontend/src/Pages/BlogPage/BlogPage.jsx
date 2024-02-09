import React from 'react'
import './BlogPage.scss'
import { Blog, NavBlog } from '../../components/Blog/Blog'
function BlogPage() {
    return (
        <div className="blog-page">
            <div className="blog-page-head">
                <NavBlog />
            </div>
            <div className="blog-page-body">
                <Blog slice={50} />
            </div>
        </div>
    )
}

export default BlogPage