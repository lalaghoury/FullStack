import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './UserProfilePage.scss'
import { useFunctions } from '../../context/FunctionsSupply'
import { useAccount } from '../../context/AccountContext';
import axios from 'axios';
import { Breadcrumb, Button, Divider, Form, Input } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

function UserProfilePage() {
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState({})
    const { getUser, } = useFunctions();
    const { user_id } = useParams();
    const { handleUserActivity, handleSignout } = useAccount();
    useEffect(() => {
        handleUserActivity()
        getUser(user_id).then((data) => setUser(data))
    }, [])
    console.log(user)
    return (
        <div className="user-profile-page">
            <div className="breadcrumb">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: 'Home',
                            href: '/',
                            className: 'bold',
                        },
                        {
                            title: 'Profile',
                            href: '/recipe',
                            className: 'bold',
                        },
                    ]}
                />
            </div>

            <div className="profile-head">

                <div className="user-image">
                    <span className='rotate'>
                        <img width="70" height="70" src="https://img.icons8.com/dotty/70/chef-hat.png" alt="chef-hat" />
                    </span>
                    <img src={user.userbigimage} alt={user.username} />
                </div>

                <span className='text-primary'><h4>Edit Profile Picture </h4><BellOutlined /></span>

                <div className="profile-head-details">
                    <span className="details-user-card">
                        <h4>Followers</h4>
                        <h3>2k</h3>
                    </span> <hr />
                    <span className="details-user-card">
                        <h4>Experience</h4>
                        <h3>3 months</h3>
                    </span> <hr />
                    <span className="details-user-card">
                        <h4>Recipes</h4>
                        <h3>14</h3>
                    </span>
                </div>
            </div>
            <Divider />

            <div className="profile-details">
                <div className="user-form">
                    <Form
                        style={{
                            width: 700,
                        }}
                        initialValues={{
                            name: user.username,
                            username: user.username,
                            email: user.email,
                            password: user.password,
                        }}
                        autoComplete="off"
                        size='small'
                        layout="vertical"
                    >
                        <div className='k2'>
                            {/* input for name */}
                            <Form.Item
                                label="Name"
                                style={{ opacity: 0.7 }}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter Your Full Name" style={{ padding: 8 }}
                                    className="antd-form-input" />
                            </Form.Item>

                            {/* input for username */}
                            <Form.Item
                                label="Username"
                                name="username"
                                style={{ opacity: 0.7 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    }
                                ]}
                            >
                                <Input placeholder="Enter Your Username" style={{ padding: 8 }}
                                    className="antd-form-input" />
                            </Form.Item>
                        </div>

                        <div className='k2'>
                            {/* input for email */}
                            <Form.Item
                                label="Email"
                                name="email"
                                style={{ opacity: 0.7 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    }
                                ]}
                            >
                                <Input placeholder="Enter Your Email" style={{ padding: 8 }} />
                            </Form.Item>

                            {/* input for password */}
                            <Form.Item
                                label="Password"
                                name="password"
                                style={{ opacity: 0.7 }}
                                rules={[

                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    }
                                ]}
                            >
                                <Input type='password' placeholder="Enter Your Password" style={{ padding: 8 }}
                                    className="antd-form-input" />
                            </Form.Item>
                        </div>
                        {/* Input for user Bio */}
                        <Form.Item
                            label="User Bio"
                            name="bio"
                            style={{ opacity: 0.7 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your bio!',
                                }
                            ]}
                        >
                            <TextArea placeholder="Hello welcome to my page , I hope you enjoy the recipes I created" style={{ padding: 8 }}
                                className="antd-form-input" />
                        </Form.Item>
                    </Form>
                </div>
                <div className="user-plan">
                    <div className='user-plan-div'>
                        <span className='s1'>
                            <h3>My Recipes</h3>
                            <span><img width="70" height="70" src="https://img.icons8.com/dotty/70/chef-hat.png" alt="chef-hat" /></span>
                        </span>
                        <span className='s2'>
                            <p>These are the recipes <strong>{user && user.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'User'}</strong> has created</p>
                            <span><Link className="links-fix text-primary bold" to="/my-recipes">Show & manage</Link></span>
                        </span>
                    </div>
                    <div className='user-plan-div'>
                        <span className='s1'>
                            <h3>Recipes</h3>
                            <span><img width="70" height="70" src="https://img.icons8.com/dotty/70/chef-hat.png" alt="chef-hat" /></span>
                        </span>
                        <span className='s2'>
                            <p>Recipes</p>
                            <span className='text-primary bold'>Show & manage</span>
                        </span>
                    </div>
                    <div className='user-plan-div'>
                        <span className='s1'>
                            <h3>Recipes</h3>
                            <span><img width="70" height="70" src="https://img.icons8.com/dotty/70/chef-hat.png" alt="chef-hat" /></span>
                        </span>
                        <span className='s2'>
                            <p>Recipes</p>
                            <span className='text-primary bold'>Show & manage</span>
                        </span>
                    </div>
                    <div className='user-plan-div'>
                        <span className='s1'>
                            <h3>Recipes</h3>
                            <span><img width="70" height="70" src="https://img.icons8.com/dotty/70/chef-hat.png" alt="chef-hat" /></span>
                        </span>
                        <span className='s2'>
                            <p>Recipes</p>
                            <span className='text-primary bold'>Show & manage</span>
                        </span>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="user-newsletter">
                <h3>Newsletter</h3>
                <span>
                    <p>You are currently subscribed to our newsletter.</p>
                    <button className="btn-primary-medium bg-primary cursor">
                        <Link className="text-white links-fix" to="/signup">Unsubscribe</Link>
                    </button>
                </span>
                <div className="user-newsletter-buttons">
                    {/* <Input placeholder="Enter Your Email" style={{ padding: 8 }} /> */}
                    <Button className='user-btn bg-primary text-white bold '>Save</Button>
                    <Button onClick={handleSignout} className='user-btn text-grey bold'>Logout</Button>
                </div>
            </div>
        </div>
    )
}
export default UserProfilePage