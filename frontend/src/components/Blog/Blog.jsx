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

function Blog() {
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
      <div className="common-heading">
        <h1 className="text-black font-48">Blog</h1>
        <span className="text-primary">
          <Link to="/blog" className="text-primary links-fix">View more</Link>
        </span>
      </div>
      <div className="blog-posts">
        {allBlogs.slice(0, 2).map((item) => (
          <div key={item._id} className="blog-card">
            <div className="blog-card-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="blog-card-text">
              <h1 className="font-24 text-black">
                <Link className="links-fix text-black" to={`/recipe/${item._id}`}>
                  {item.title}
                </Link>
              </h1>
              <p>{item.slogan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Blog, NavBlog };

