import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useFunctions } from "../../context/FunctionsSupply";

const NavBlog = () => (
  <div className="breadcrumb">
    <Breadcrumb
      separator=">"
      items={[
        {
          title: "Home",
          href: "/",
          className: "bold",
        },
        {
          title: "Blog",
          href: "/blog",
          className: "bold text-primary",
        },
      ]}
    />
  </div>
);

const BlogHeading = () => (
  <div className="common-heading">
    <h1 className="text-black font-48">Blog</h1>
    <span className="text-primary">
      <Link to="/blog" className="text-primary links-fix">View more</Link>
    </span>
  </div>
)

function Blog({ slice }) {
  const { getAllBlogs } = useFunctions();
  const [allBlogs, setAllBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllBlogs()
      .then(setAllBlogs)
      .catch(setError);
  }, [getAllBlogs]);

  if (error) {
    return <div>Error fetching blogs: {error.message}</div>;
  }

  return (
    <div className="blog-container">
      <BlogHeading />
      <div className="blog-posts">
        {allBlogs.slice(0, slice).map((blog) => (
          <div key={blog._id} className="blog-card">
            <div className="blog-card-img">
              <img src={blog.image} alt={blog.title} />
            </div>
            <div className="blog-card-text">
              <h1 className="font-24 text-black">
                <Link className="links-fix text-black" to={`/blog/${blog._id}`}>F
                  {blog.title}
                </Link>
              </h1>
              <p>{blog.slogan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Blog, NavBlog, BlogHeading };

