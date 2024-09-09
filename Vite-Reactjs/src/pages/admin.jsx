import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, ProductOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, FundFilled, ToolFilled } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
import '../styles/admin.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom';
const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
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
                    label: <Link to="user">User</Link>,
                },
                {
                    key: '4',
                    icon: <ProductOutlined />,
                    label: <Link to="product">Product</Link>
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
                    <h2 onClick={() => navigate('/')}>{collapsed ? 'Ad' : 'Admin'}</h2>
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
