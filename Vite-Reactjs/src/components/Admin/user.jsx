import React, { useEffect, useState } from 'react';
import { notification, Space, Table, Tag } from 'antd';
import { fetchListUser } from '../../services/UserServices';
import ModalCreateUser from './Modal/ModalCreateUser';
import { PlusCircleFilled } from '@ant-design/icons';
import '../../styles/manage.scss'
import ModalDelete from './Modal/ModalDelete';
const { Column } = Table;

const UserPage = () => {
    const [dataListUser, setDataUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [dataDelete, setDataDelete] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})
    const [isViewUser, setIsViewUser] = useState(false)
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

    const handleEditBtn = (item) => {
        setIsModalOpen(true);
        setDataUpdate(item)
    }

    const handleViewBtn = (item) => {
        setIsModalOpen(true)
        setDataUpdate(item)
        setIsViewUser(true)
    }
    return (
        <>

            <button onClick={showModal} className='btn-add-new'>{<PlusCircleFilled />}Add</button>
            <ModalCreateUser
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchListUSer={fetchListUSer}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isViewUser={isViewUser}
                setIsViewUser={setIsViewUser}
            />
            <ModalDelete
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
                            <a onClick={() => handleViewBtn(record)}>View</a>
                            <a onClick={() => handleEditBtn(record)}>Edit</a>
                            <a onClick={() => handleDeleteBtn(record)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
};
export default UserPage;