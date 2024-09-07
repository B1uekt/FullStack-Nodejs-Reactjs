import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, FundFilled, ToolFilled } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
import '../styles/admin.scss'
import { Link, Outlet } from 'react-router-dom';
const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        {
            key: '1',
            icon: <FundFilled />,
            label: 'DashBoard',
        },
        {
            key: '2',
            icon: <ToolFilled />,
            label: 'Manage',
            children: [
                {
                    key: '3',
                    icon: <UserOutlined />,
                    label: <Link to="user">USER</Link>,
                },
                {
                    key: '4',
                    icon: <VideoCameraOutlined />,
                    label: 'Application',
                }
            ]
        },
        {
            key: '5',
            icon: <UploadOutlined />,
            label: 'Upload',
        },
    ];


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider

                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical">
                    <h2>{collapsed ? 'Ad' : 'Admin'}</h2>
                </div>
                <Menu className="menu-sidebar" theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: '#f0f2f5' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>

                <Content style={{ margin: '0 16px' }}>


                    <div
                        className='admin-content'
                    >
                        <Outlet />
                    </div>
                </Content>


            </Layout>
        </Layout>
    );
};

export default AdminPage;
