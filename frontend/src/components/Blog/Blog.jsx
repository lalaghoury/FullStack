import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Card, Divider } from "antd";
import { useFunctions } from "../../context/FunctionsSupply";

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
    <div className="blog-container">
      <BlogHeading />
      <Divider />
      <div className="blog-posts">
        {slice !== 0 ? (
          <>
            {allBlogs && allBlogs.slice(0, slice).map((blog) => (
              <Card hoverable onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className="blog-card" bodyStyle={{ padding: 0 }}>
                <div className="blog-card-img">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <Card.Meta
                  title={
                    <Link className="links-fix text-black" to={`/blog/${blog._id}`}>
                      {blog.title}
                    </Link>
                  }
                  description={blog.description.length > 30 ? blog.description.substring(0, 30) + '...' : blog.description} />
              </Card>
            ))}
          </>
        ) : (
          <>
            {allBlogs && allBlogs.map((blog) => (
              <Card key={blog._id} className="blog-card" hoverable onClick={() => navigate(`/blog/${blog._id}`)}>
                <div className="blog-card-img">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <Card.Meta
                  title={
                    <Link className="links-fix text-black" to={`/blog/${blog._id}`}>
                      {blog.title}
                    </Link>
                  }
                  description={blog.slogan}
                />
              </Card>
            ))}
          </>
        )}
      </div>
    </div >
  );
}

export { Blog, BlogHeading, BlogBreadcrumb };

