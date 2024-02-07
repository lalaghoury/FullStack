import React, { useState } from 'react'
import './SignUpPage.scss'
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useAccount } from '../../context/AccountContext';

function SignUpPage() {
    const [form] = Form.useForm();
    const { handleSignup } = useAccount();

    return (
        <div className='signup-page'>
            <div className="signup-img">
                <img src="http://res.cloudinary.com/dslrkvmwn/image/upload/v1707028163/images/bb2a7jwwkymlpuravokr.png" alt="img" />
            </div>
            <div className="signup-text">
                <h1>Want to join our family</h1>

                <Form
                    form={form}
                    layout="vertical"
                    size='medium'
                    onFinish={handleSignup}>
                    {/*  Username Field */}
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className='small-input' allowClear placeholder="Enter Username" />
                    </Form.Item>
                    <Divider className='small-divider' />
                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: 'email', required: true, message: 'Please input your email!' },
                            {
                                validator: (_, value) => {
                                    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return Promise.reject(new Error('The input is not a valid email!'));
                                    }
                                    return Promise.resolve();
                                },
                            },
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
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter Password" className='small-input' style={{ width: '100%' }} allowClear />
                    </Form.Item>
                    <Divider className='small-divider' />
                    {/* Confirm Password Field */}
                    <Form.Item
                        label="Confirm Password"
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" className='small-input' style={{ width: '100%' }} allowClear />
                    </Form.Item>
                    <Divider className='small-divider' />
                    <Form.Item>
                        {/* Terms and Conditions Checkbox */}
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions!')) },
                            ]}
                        >
                            <Checkbox>
                                I agree to the <Link to="/terms-and-conditions">terms and conditions</Link>
                            </Checkbox>
                        </Form.Item>
                        <Divider className='small-divider' />
                        {/* Submit Button */}
                        <Button className='text-white bold bg-primary cursor disable-hover' htmlType="submit" >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default SignUpPage