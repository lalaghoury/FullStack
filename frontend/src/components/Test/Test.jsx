import React, { useEffect, useState } from 'react';
import './Test.scss';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

function Test() {
  const [form] = Form.useForm();
  const user = localStorage.getItem('userId');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/blog')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the blogs:", error);
      });
  }, []);


  const onFinish = async (values) => {
    if (blogs.length > 0) {
      const commentData = await axios.post('http://localhost:5000/comments', { ...values, user, blog: blogs[0]._id });
      console.log('Comment data to be submitted:', commentData);
    } else {
      console.warn('No blogs available to comment on.');
    }
  };

  // console.log(userId, blogs[0]._id);


  return (
    <div className="test">
      <h1>test</h1>
      <div className="container">
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name='comment'
            rules={[{ required: true, message: 'Please enter your comment!' }]}
          >
            <Input placeholder='Enter Comment' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Test;

