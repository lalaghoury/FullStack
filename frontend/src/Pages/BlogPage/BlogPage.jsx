import React from 'react'
import './BlogPage.scss'
import { Blog, BlogBreadcrumb } from '../../components/Blog/Blog'
function BlogPage() {
    return (
        <div className="blog-page">
            <div className="blog-page-heading">
                <BlogBreadcrumb />
            </div>
            <div className="blog-page-body">
                <Blog slice={50} />
            </div>
        </div>
    )
}

export default BlogPage