import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import '../../styles/header.scss'
import LogoHeader from '../../assets/images/logo.png'

const Header = () => {
    const items = [
        {
            label: <Link to="/">HomePage</Link>,
            key: 'mail',
            icon: <MailOutlined />,
        },
        {
            label: <Link to="/user">User</Link>,
            key: 'user',
            icon: <MailOutlined />,
        },
        {
            label: 'Welcome',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    label: 'Login',
                    key: 'Login',
                },
                {
                    label: 'Logout',
                    key: 'Logout',
                },
            ],
        },
    ];
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <div className='top-header'>
                <Row style={{ height: '100%' }}>
                    <Col className='left-header' span={8}>
                        <span>HOTLINE: 0123 456 789</span>
                    </Col>
                    <Col className='logo-header' span={8}>
                        <img src={LogoHeader}></img>
                    </Col>
                    <Col className='right-header' span={8}>
                        <span>ABC</span>
                    </Col>
                </Row>
            </div>
            <div>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
        </>

    );
};
export default Header;