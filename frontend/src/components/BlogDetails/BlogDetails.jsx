import React, { useEffect, useState } from 'react';
import './BlogDetails.scss';
import { useFunctions } from '../../context/FunctionsSupply';
import { Breadcrumb, Button, Card } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { CalendarOutlined, CommentOutlined } from '@ant-design/icons';
import PostList from '../../PostList';

function BlogDetails() {
  const { blog_id } = useParams();
  const { getAllBlogs, getSingleBlog } = useFunctions();
  const [loading, setLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllBlogs().then(data => setAllBlogs(data)).catch(error => console.error(error)).finally(() => setLoading(false));
    getSingleBlog(blog_id).then(data => setBlog(data)).catch(error => console.error(error));
  }, [blog_id, getAllBlogs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="blog-details">
      <div className="blog-details-head">
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
              {
                title: blog.title,
                href: "#",
                className: "bold text-primary",
              }
            ]}
          />
        </div>
        <div className="blog-details-heading" style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
          <h1>{blog.title}</h1>
          <p><i>{blog.slogan}</i></p>
        </div>
        <div className="blog-details-user">
          <span className="blog-details-user-card">
            <img src={blog.user.userimage} alt="userimage" style={{ marginRight: 10 }} />
            <h4>
              <Link className="links-fix text-black" to={`/user/${blog.user._id}`}>
                {blog.user.username}
              </Link>
            </h4>
          </span>
          <span className="blog-details-user-card">
            <CalendarOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
            <i>{blog.category.categoryname}</i>
          </span>
          <span className="blog-details-user-card">
            <CommentOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
            {/* {blog.comments} Comments */}
          </span>
        </div>
      </div>
      <div className="blog-details-body">
        <div className="blog-left">
          <div className="blog-left-image">
            <img src={blog.image} alt={blog.title} />
          </div>
          <div className="blog-left-text">
            <div className="body-left-text-second">
              <p>{blog.description}</p>
              <p>{blog.content}</p>
            </div>
          </div>
          <div className="blog-comments">
            <PostList blog_id={blog._id} />
          </div>
        </div>
        <div className="blog-right">
          <div className="blog-right-recent-recipes">
            <h2>Recent Blogs</h2>
            <div>
              {allBlogs && allBlogs.slice(0, 3).map((recentBlog) => (
                <Card
                  key={recentBlog._id}
                  hoverable
                  style={{ width: 200, marginBottom: 10 }}
                  cover={<img alt={recentBlog.title} src={recentBlog.image} />}
                >
                  <center><strong style={{ marginBottom: 5 }}>{recentBlog.title}</strong></center>
                  <a href={`/blog/${recentBlog._id}`} className="links-fix text-black">
                    <Button className="disable-hover" type="primary" block>
                      View Blog
                    </Button>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
