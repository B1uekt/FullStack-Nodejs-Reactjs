import { useState } from "react";
import { PlusCircleFilled } from '@ant-design/icons';
import ModalCreateProduct from "./Modal/ModalCreateProduct";

const Product = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <button onClick={showModal} className='btn-add-new'>{<PlusCircleFilled />}Add</button>
            <ModalCreateProduct
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}

export default Product
