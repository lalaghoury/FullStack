import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Card, Divider } from "antd";
import { useFunctions } from "../../context/FunctionsSupply";
import AppLayout from "../../Layout/Layout";
import BlogCard from "../BlogCard/BlogCard";

const ViewMoreLink = () => {
  return (
    <span className="text-primary">
      <Link to="/blog" className="text-primary links-fix">View more</Link>
    </span>
  )
}

const BlogHeading = () => (
  <div className="common-heading">
    <h1 className="text-black font-48">Blog</h1>
    <ViewMoreLink />
  </div>
)

const BlogBreadcrumb = () => (
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

)

function Blog({ slice }) {
  const { getAllBlogs } = useFunctions();
  const [allBlogs, setAllBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs()
      .then(setAllBlogs)
      .catch(setError);
  }, [getAllBlogs]);

  if (error) {
    return <div>Error fetching blogs: {error.message}</div>;
  }

  return (
    <AppLayout>
      <BlogHeading />
      <div className="blog-container">
        <BlogCard slice={slice} />
      </div >
    </AppLayout>
  );
}

export { Blog, BlogHeading, BlogBreadcrumb };

