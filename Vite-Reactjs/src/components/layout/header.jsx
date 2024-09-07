import React, { useState } from 'react';
import { DownOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu, Row, Col, Dropdown, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import LogoHeader from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { doLogout } from '../../redux/action/userAction';
import '../../styles/header.scss'
const Header = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()
    const items = [
        {
            label: <Link to="/">HOME</Link>,
            key: 'home',

        },
        (isAuthenticated && account.role === 'ADMIN') ? (
            {
                label: <Link to="/admin">ADMIN</Link>,
                key: 'user',
            }
        ) : null,
        {
            label: <Link to="/about-toys">ALL ABOUT TOYS</Link>,
            key: 'toy',
        },
        {
            label: <Link to="/accessories">ACCESSORIES</Link>,
            key: 'accessories',
        },
        {
            label: <Link to="/about-us">ABOUT US</Link>,
            key: 'about',
        },
        {
            label: <Link to="/contact">CONTACT US</Link>,
            key: 'contact',
        },

    ];
    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogOut = () => {
        dispatch(doLogout())
        notification.success({
            message: "Logout succeed!",
            description: "Success"
        })
        navigate('/')
    }
    return (
        <>
            <div className='top-header'>
                <Row style={{ height: '100%' }}>
                    <Col className='left-header' span={8}>
                        <span style={{ color: 'black' }}>HOTLINE: 0123 456 789</span>
                    </Col>
                    <Col className='logo-header' span={8}>
                        <img src={LogoHeader}></img>
                    </Col>
                    <Col className='right-header' span={8}>
                        <Dropdown className='spn-account'
                            menu={isAuthenticated ? {
                                items: [
                                    {
                                        key: 'profile',
                                        label: <Link to="/profile">PROFILE</Link>,
                                    },
                                    {
                                        key: 'logout',
                                        label: 'LOG OUT',
                                        onClick: () => handleLogOut()
                                    },
                                ],
                            } : {
                                items: [
                                    {
                                        key: 'account',
                                        label: <Link to="/login">LOG IN</Link>,
                                    },
                                    {
                                        key: 'cart',
                                        label: <Link to="/register">SIGN UP</Link>,
                                    },
                                ],
                            }}
                        >
                            <a href="#" className="ant-dropdown-link">
                                ACCOUNT <DownOutlined />
                            </a>
                        </Dropdown>
                        <div className='cart'>
                            <span className='spn-cart'> <ShoppingCartOutlined /></span>
                            <span className='number'>3</span>
                        </div>

                        <span><SearchOutlined /></span>
                    </Col>
                </Row>

            </div >
            <div className='menu-header'>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
        </>

    );
};
export default Header;