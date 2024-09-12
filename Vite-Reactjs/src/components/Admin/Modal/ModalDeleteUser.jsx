import React from 'react';
import { Modal, notification } from 'antd';
import { deleteUser } from '../../../services/UserServices';
const ModalDeleteUser = (props) => {
    const { isModalDeleteOpen, setIsModalDeleteOpen, dataDelete, setDataDelete, fetchListUSer } = props

    const handleOk = async () => {

        const res = await deleteUser(dataDelete.id)
        if (res && res.EC === 0) {
            notification.success({
                message: "Success",
                description: res.EM
            })
            fetchListUSer()
            setIsModalDeleteOpen(false);
            setDataDelete({})
        }
        else {
            notification.error({
                message: "Error",
                description: res.EM
            })
        }
    };
    const handleCancel = () => {
        setIsModalDeleteOpen(false);
        setDataDelete({})
    };
    return (
        <>
            <Modal
                title="Confirm Delete the User ? "
                open={isModalDeleteOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure to delete user email: <b>{dataDelete.email}</b></p>
            </Modal>
        </>
    );
};
export default ModalDeleteUser;