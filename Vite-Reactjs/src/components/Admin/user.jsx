import React, { useEffect, useState } from 'react';
import { notification, Space, Table, Tag, Modal } from 'antd';
import { fetchListUser } from '../../services/UserServices';
import ModalCreateUser from './Modal/ModalCreateUser';
import { PlusCircleFilled } from '@ant-design/icons';
import '../../styles/user.scss'
import ModalDeleteUser from './Modal/ModalDeleteUser';
const { Column } = Table;

const UserPage = () => {
    const [dataListUser, setDataUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [dataDelete, setDataDelete] = useState({})
    const fetchListUSer = async () => {
        const res = await fetchListUser();
        if (!res?.message) {
            setDataUser(res);
        } else {
            notification.error({
                message: 'Unauthorized',
                description: res.message,
            });
        }
    };

    // Gọi fetchUSer khi component mount lần đầu tiên
    useEffect(() => {
        fetchListUSer();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteBtn = (item) => {
        setIsModalDeleteOpen(true);
        setDataDelete(item)
    }
    return (
        <>

            <button onClick={showModal} className='btn-add-new'>{<PlusCircleFilled />}Add</button>
            <ModalCreateUser
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchListUSer={fetchListUSer}
            />
            <ModalDeleteUser
                isModalDeleteOpen={isModalDeleteOpen}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchListUSer={fetchListUSer}
            />
            <Table pagination={{ defaultCurrent: 1, pageSize: 5, align: "center" }} dataSource={dataListUser} rowKey={(record) => `user_${record.id}`}>
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
                            <a onClick={() => handleDeleteBtn(record)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
};
export default UserPage;