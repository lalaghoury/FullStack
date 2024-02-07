import React from 'react'
import './LogInPage.scss'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAccount } from '../../context/AccountContext';

function LogInPage() {
    axios.defaults.withCredentials = true;
    const { handleLogin } = useAccount();
    const [form] = Form.useForm();

    return (
        <div className='login-page'>
            <div className="signup-img">
                <img src="http://res.cloudinary.com/dslrkvmwn/image/upload/v1707028163/images/bb2a7jwwkymlpuravokr.png" alt="img" />
            </div>
            <div className="signup-text">
                <h1>Log in</h1>
                <Form
                    form={form}
                    layout="vertical"
                    size='medium'
                    onFinish={handleLogin}>
                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: 'email', required: true, message: 'Please input your email!' },

                        ]}
                    >
                        <Input
                            className='small-input'
                            allowClear
                            placeholder="Enter Email"
                            onBlur={() => form.validateFields(['email'])}
                            suffix={
                                form.getFieldValue('email') ? (
                                    form.getFieldError('email') ? (
                                        <CloseCircleOutlined style={{ color: 'red' }} />
                                    ) : (
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                    )
                                ) : null
                            }
                        />
                    </Form.Item>
                    <Divider className='small-divider' />
                    {/* Password Field */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[

                            { required: true, message: 'Please input your password!' },

                        ]}
                    >
                        <Input
                            className='small-input'
                            allowClear
                            placeholder="Enter Password"
                            onBlur={() => form.validateFields(['password'])}
                            suffix={
                                form.getFieldValue('password') ? (
                                    form.getFieldError('password') ? (
                                        <CloseCircleOutlined style={{ color: 'red' }} />
                                    ) : (
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                    )
                                ) : null
                            }
                        />
                    </Form.Item>
                    <Divider className='small-divider' />
                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='login-button bold text-white bg-primary disable-hover'>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LogInPage;