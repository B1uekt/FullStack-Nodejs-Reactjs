import React, { useState } from 'react';
import { DownOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu, Row, Col, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import '../../styles/header.scss'
import LogoHeader from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
const Header = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const items = [
        {
            label: <Link to="/">HOME</Link>,
            key: 'home',

        },
        isAuthenticated ? (
            {
                label: <Link to="/user">USER</Link>,
                key: 'user',
            }
        ) : null,
        {
            label: <Link to="/user">ALL ABOUT TOYS</Link>,
            key: 'toy',
        },
        {
            label: <Link to="/user">ACCESSORIES</Link>,
            key: 'accessories',
        },
        {
            label: <Link to="/user">ABOUT US</Link>,
            key: 'about',
        },
        {
            label: <Link to="/user">CONTACT US</Link>,
            key: 'contact',
        },

    ];
    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogOut = () => {
        // dispatch(doLogout())
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