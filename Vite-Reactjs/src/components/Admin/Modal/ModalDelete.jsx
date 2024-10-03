import React from 'react';
import { Modal, notification } from 'antd';
import { deleteUser } from '../../../services/UserServices';
import { deleteProduct } from '../../../services/ProductServiecs';
const ModalDeleteUser = (props) => {
    const { isModalDeleteOpen, setIsModalDeleteOpen, dataDelete, setDataDelete, fetchListUSer, fetchListProduct } = props

    const handleOk = async () => {
        if (dataDelete.email) {
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
        }
        else {
            console.log(dataDelete)
            const res = await deleteProduct(dataDelete.id)
            if (res && res.EC === 0) {
                notification.success({
                    message: "Success",
                    description: res.EM
                })
                fetchListProduct()
                setIsModalDeleteOpen(false);
                setDataDelete({})
            }
            else {
                notification.error({
                    message: "Error",
                    description: res.EM
                })
            }
        }
    };
    const handleCancel = () => {
        setIsModalDeleteOpen(false);
        setDataDelete({})
    };
    return (
        <>
            <Modal
                title={(dataDelete.email) ? "Confirm Delete the User ? " : "Confirm Delete Product ? "}
                open={isModalDeleteOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {(dataDelete.email) ?

                    <p>Are you sure to delete user email: <b>{dataDelete.email}</b></p>

                    :
                    <p>Are you sure to delete product: <b>{dataDelete.name}</b></p>
                }
            </Modal>
        </>
    );
};
export default ModalDeleteUser;