import React from 'react';
import { Button, Form, Input, notification, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import '../styles/register.scss'
import { postLogin } from '../services/AuthServices';
import { doLogin } from '../redux/action/userAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await postLogin(email, password)
        console.log(res)
        if (res && res.EC === 0) {
            dispatch(doLogin(res))
            notification.success({
                message: "Login succeed!",
                description: "Success"
            })
            navigate('/')
        }
        if (res && res.EC !== 0) {
            notification.success({
                message: "Login Fail!",
                description: res?.EM ?? "error"
            })
        }

    };
    return (
        <>
            <Breadcrumb className='container'
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined />,
                    },
                    {
                        title: 'Login',
                    },
                ]}
            />
            <div className='register-container'>
                <div className='welcome'>
                    LOGIN
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
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </>
    )

}

export default LoginPage