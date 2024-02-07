import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useAccount } from '../../context/AccountContext';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button } from 'antd';

const Navbar = () => {
    const navigate = useNavigate()
    const { handleSignout, loginCheck } = useAccount()

    const showNav = loginCheck();

    const [open, setOpen] = useState(false);

    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    const handleMenuClick = (e) => {
        if (e.key === 'profile') {
            navigate('/userprofile');
        } else if (e.key === 'logout') {
            handleSignout();
        } else if (e.key === 'myRecipes') {
            navigate('/my-recipes');
        }
    };

    const items = [
        {
            label: <Link to={`/user/${localStorage.getItem('userId')}`}>My Profile</Link>,
            key: '0',
        },
        {
            label: <a href="/my-recipes">My Recipes</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <Button onClick={handleSignout} className="disable-hover text-white bold bg-primary">Logout</Button>,
            key: '3',
        },
    ];

    // const menu = (
    //     <Menu onClick={handleMenuClick}>
    //         <Menu.Item key="profile">Visit Profile</Menu.Item>
    //         <Menu.Item key="myRecipes">My Recipes</Menu.Item>
    //         <Menu.Divider />
    //         <Menu.Item key="logout">
    //             <Button className="disable-hover text-white bold bg-primary">
    //                 Logout
    //             </Button>
    //         </Menu.Item>
    //     </Menu>
    // );

    return (
        <nav className="navbar">
            <Logo />
            <div className="nav-links">
                <Link className="text-black links-fix" to="/">
                    Home
                </Link>
                <Link className="text-black links-fix" to="/recipe">
                    Recipe
                </Link>
                <Link className="text-black links-fix" to="/add-recipe">
                    Add Recipe
                </Link>
                <Link className="text-black links-fix" to="/blog">
                    Blog
                </Link>
                <Link className="text-black links-fix" to="/about">
                    About us
                </Link>
            </div>

            {showNav ? (
                <div className="nav-buttons">
                    <SearchOutlined className="bold" style={{ fontSize: 30, opacity: 0.6 }} />
                    {/* <Dropdown
                        overlay={menu}
                        placement="bottomRight"
                        arrow
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <a href="#" onClick={e => e.preventDefault()} style={{ cursor: 'pointer' }}>
                            <img
                                src="https://i.ibb.co/yhrMpQz/s-homepage-recipe-row-user-icon.png"
                                alt="user icon"
                            />
                        </a>
                    </Dropdown> */}
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['hover']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space style={{ cursor: 'pointer' }}>
                                <img
                                    src="https://i.ibb.co/yhrMpQz/s-homepage-recipe-row-user-icon.png"
                                    alt="user icon"
                                />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            ) : (
                <div className="nav-buttons">
                    <button className="btn-sec-small cursor"><Link className="text-black links-fix" to="/login">Log in</Link></button>
                    <button className="btn-primary-small cursor"><Link className="text-white links-fix" to="/signup">Sign up</Link></button>
                </div>
            )}

            <div className="nav-hamburger">
                {/* Hamburger icon goes here */}
                <div className="nav-hamburger">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="24"
                        viewBox="0 0 32 24"
                        fill="none"
                    >
                        <rect width="32" height="3" rx="1.5" fill="black" />
                        <rect y="8.23535" width="32" height="3" rx="1.5" fill="black" />
                        <rect y="16.4707" width="32" height="3" rx="1.5" fill="black" />
                    </svg>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;