import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import fetchListUser from '../services/UserServices';
const { Column } = Table;

const UserPage = () => {
    const [dataListUser, setDataUser] = useState([])

    useEffect(() => {
        const fetchUSer = async () => {
            const res = await fetchListUser()
            if (res) {
                setDataUser(res)
            }
        }
        fetchUSer()
    }, [])

    return (
        <Table className='container' dataSource={dataListUser} rowKey={(record) => `user_${record.id}`}>
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            <Column title="Phone" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column title="Role" dataIndex="role" key="role" />
            <Column
                title="Tags"
                dataIndex="role"
                key="role"
                render={(role, record) => {
                    let color = 'geekblue';
                    if (role === 'USER') {
                        color = 'volcano';
                    }

                    return (
                        <Tag color={color} key={role}>
                            {record.role}
                        </Tag>
                    );
                }}
            />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <a>Invite {record.lastName}</a>
                        <a>Delete</a>
                    </Space>
                )}
            />
        </Table>
    )
};
export default UserPage;