import React, { useEffect, useState } from 'react';
import { notification, Space, Table, Tag, Modal } from 'antd';
import fetchListUser from '../../services/UserServices';
import ModalCreateUser from './Modal/ModalCreateUser';
import { PlusCircleFilled } from '@ant-design/icons';
import '../../styles/user.scss'
const { Column } = Table;

const UserPage = () => {
    const [dataListUser, setDataUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUSer = async () => {
            const res = await fetchListUser()
            if (!res?.message) {
                setDataUser(res)
            }
            else {

                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchUSer()
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>

            <button onClick={showModal} className='btn-add-new'>{<PlusCircleFilled />}Add</button>
            <ModalCreateUser
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <Table dataSource={dataListUser} rowKey={(record) => `user_${record.id}`}>
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
        </>
    )
};
export default UserPage;