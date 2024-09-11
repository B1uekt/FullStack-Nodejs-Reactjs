import React from 'react';
import { Button, Form, Input, notification, Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/register.scss'
import { postRegister } from '../services/AuthServices';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        const { firstName, lastName, email, password } = values;
        const res = await postRegister(firstName, lastName, email, password)
        if (res) {

            notification.success({
                message: "Create User succeed!",
                description: "Success"
            })
            navigate('/login')
        }
        else {
            notification.success({
                message: "Create User fail",
                description: "error"
            })
        }
    };
    return (
        <>
            <Breadcrumb className='container'
                items={[
                    {
                        href: '',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '',
                        title: (
                            <>
                                <UserOutlined />
                                <span>Application List</span>
                            </>
                        ),
                    },
                    {
                        title: 'Application',
                    },
                ]}
            />
            <div className='register-container'>
                <div className='welcome'>
                    REGISTER
                </div>
                <div className='register-content'>
                    <Form
                        className='form-register'
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last Name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item className='btn-create'
                        >
                            <Button className='btn-create' type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </>
    )

}

export default RegisterPage