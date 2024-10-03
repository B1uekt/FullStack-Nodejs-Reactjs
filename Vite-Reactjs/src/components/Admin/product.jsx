import { useEffect, useState } from "react";
import { PlusCircleFilled } from '@ant-design/icons';
import ModalCreateProduct from "./Modal/ModalCreateProduct";
import { getAllProduct } from "../../services/ProductServiecs";
import commonUtil from "../../util/commonUtils";
import { notification, Space, Table, Tag } from 'antd';
import ModalDelete from './Modal/ModalDelete';
import '../../styles/manage.scss'
const { Column } = Table;

const Product = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataProduct, setDataProduct] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [dataProductUpdate, setDataProductUpdate] = useState({})
    const [isViewProduct, setIsViewProduct] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [dataDelete, setDataDelete] = useState({})
    const showModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        fetchListProduct();
    }, [])

    const handleEditBtn = (item) => {
        setIsModalOpen(true)
        setDataProductUpdate(item)
    }

    const handleViewBtn = (item) => {
        setIsModalOpen(true)
        setDataProductUpdate(item)
        setIsViewProduct(true)
    }
    const handleDeleteBtn = (item) => {
        setIsModalDeleteOpen(true);
        setDataDelete(item)
    }
    const fetchListProduct = async () => {
        const res = await getAllProduct();
        if (res && res.EC === 0 && Array.isArray(res.result)) {
            console.log(res)
            const productsWithBase64 = await Promise.all(
                res.result.map(async (product) => {
                    const imageBase64 = product.image ? await commonUtil.bufferToBase64(product.image) : null;
                    const thumbnail1Base64 = product.thumbnail_1 ? await commonUtil.bufferToBase64(product.thumbnail_1) : null;
                    const thumbnail2Base64 = product.thumbnail_2 ? await commonUtil.bufferToBase64(product.thumbnail_2) : null;
                    const thumbnail3Base64 = product.thumbnail_3 ? await commonUtil.bufferToBase64(product.thumbnail_3) : null;
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        is_discount: product.is_discount,
                        discount_percent: product.discount_percent,
                        image: imageBase64,
                        thumbnail_1: thumbnail1Base64,
                        thumbnail_2: thumbnail2Base64,
                        thumbnail_3: thumbnail3Base64,
                        description: product.description,
                        typeName: product.Type.name,
                        quantity: product.quantity
                    };
                })
            );

            setDataProduct(productsWithBase64);
        } else {
            notification.error({
                message: "404",
                description: res?.EM ?? "That's an error",
            });
        }
    };

    return (
        <>
            <button onClick={showModal} className='btn-add-new'>{<PlusCircleFilled />}Add</button>
            <ModalCreateProduct
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchListProduct={fetchListProduct}
                dataProductUpdate={dataProductUpdate}
                setDataProductUpdate={setDataProductUpdate}
                isViewProduct={isViewProduct}
                setIsViewProduct={setIsViewProduct}
            />
            <ModalDelete
                isModalDeleteOpen={isModalDeleteOpen}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchListProduct={fetchListProduct}
            />
            <Table className="product-table" pagination={{ defaultCurrent: 1, pageSize: 4, align: "center" }} dataSource={dataProduct} rowKey={(record) => `user_${record.id}`}>
                <Column
                    title="Image"
                    key="image"
                    render={(text, record) => (
                        <img
                            src={record.image}
                            alt={`${record.name} image`}
                            style={{ width: '50px', height: 'auto' }} // Điều chỉnh kích thước hình ảnh theo nhu cầu
                        />
                    )}
                />
                <Column className="product-name" title="Name" dataIndex="name" key="name" />
                {previewImage && (
                    <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Discount" dataIndex="discount_percent" key="lastName" />
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
                <Column
                    title="Type"
                    dataIndex="typeName"
                    key="typeName"
                    render={(type, record) => {
                        let color = 'geekblue';
                        if (type === 'Limited Figure') {
                            color = 'volcano';
                        }
                        if (type === 'Blind Box') {
                            color = 'green'
                        }

                        return (
                            <Tag color={color} key={type}>
                                {record.typeName}
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
}

export default Product
