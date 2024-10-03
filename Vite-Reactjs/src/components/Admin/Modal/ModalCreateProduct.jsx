import { Upload, Modal, Form, Input, Row, Col, Select, Button, Image, notification } from 'antd';
import '../../../styles/modalCreate.scss'
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { getAllType } from '../../../services/TypeServices';
import { postNewProduct, putProduct } from '../../../services/ProductServiecs';
import commonUtil from "../../../util/commonUtils";
const ModalCreateProduct = (props) => {
    const { isModalOpen, setIsModalOpen, dataProductUpdate, setDataProductUpdate, isViewProduct, setIsViewProduct } = props
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [isDiscount, setIsDiscount] = useState(0)
    const [listType, setListType] = useState([])


    useEffect(() => {
        const fetchType = async () => {
            const res = await getAllType()
            if (res && res.result) {
                setListType(res.result)
            }

        }
        fetchType()
    }, [])

    useEffect(() => {
        if (dataProductUpdate && !_.isEmpty(dataProductUpdate)) {
            form.setFieldsValue({
                is_discount: dataProductUpdate.is_discount ? "YES" : "NO",
                id: dataProductUpdate.id,
                name: dataProductUpdate.name,
                price: dataProductUpdate.price,
                discount: parseFloat(dataProductUpdate.discount_percent),
                type: dataProductUpdate.typeName,
                description: dataProductUpdate.description,
                quantity: dataProductUpdate.quantity
            });
            const files = [
                {
                    uid: 'image',
                    name: 'image.png',
                    status: 'done',
                    url: dataProductUpdate.image,
                    originFileObj: commonUtil.convertBase64ToFile(dataProductUpdate.image, 'image.png'),
                },
                {
                    uid: 'thumbnail_1',
                    name: 'thumbnail_1.png',
                    status: 'done',
                    url: dataProductUpdate.thumbnail_1,
                    originFileObj: commonUtil.convertBase64ToFile(dataProductUpdate.thumbnail_1, 'thumbnail_1.png'),
                },
                {
                    uid: 'thumbnail_2',
                    name: 'thumbnail_2.png',
                    status: 'done',
                    url: dataProductUpdate.thumbnail_2,
                    originFileObj: commonUtil.convertBase64ToFile(dataProductUpdate.thumbnail_2, 'thumbnail_2.png'),
                },
                {
                    uid: 'thumbnail_3',
                    name: 'thumbnail_3.png',
                    status: 'done',
                    url: dataProductUpdate.thumbnail_3,
                    originFileObj: commonUtil.convertBase64ToFile(dataProductUpdate.thumbnail_3, 'thumbnail_3.png'),
                },
            ];
            setFileList(files);
        }
    }, [dataProductUpdate])

    const getBase64 = async (file) => {
        try {
            const reader = new FileReader();
            return await new Promise((resolve, reject) => {
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        } catch (error) {
            console.error('Error converting file to Base64:', error);
            throw error;
        }
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {

            file.preview = await getBase64(file.originFileObj);
        }
        console.log(file.preview)
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const onFinish = async (values) => {
        if (isViewProduct) {
            notification.error({
                message: "Update Product fail",
                description: "Can't change info product in view",
            })
            return
        }
        const { id, name, price, is_discount, discount, description, type, quantity } = values;
        if (is_discount === 'YES') {
            setIsDiscount(1)
        }

        if (fileList.length < 4 || fileList.length === 0) {
            notification.error({
                message: "Update Product fail",
                description: "",
            })
            return
        }
        //console.log(id, name, price, isDiscount, +discount, description, type, quantity)
        if (dataProductUpdate && !_.isEmpty(dataProductUpdate)) {
            const res = await putProduct(id, name, price, isDiscount, +discount, description, type, fileList, +quantity)
            // console.log(res)
            if (res && res.EC === 0) {
                notification.success({
                    message: "Update Product succeed!",
                    description: res.EM,
                })
                props.fetchListProduct()
                handleCancel()
            }
            else {
                notification.error({
                    message: "Update Product fail",
                    description: res.EM,
                })
            }
        }
        else {
            const res = await postNewProduct(name, price, isDiscount, +discount, description, type, fileList, +quantity)
            // console.log(res)
            if (res && res.EC === 0) {
                notification.success({
                    message: "Create Product succeed!",
                    description: res.EM,
                })
                props.fetchListProduct()
                handleCancel()
            }
            else {
                notification.error({
                    message: "Create product fail",
                    description: res.EM,
                })
            }
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([])
        setDataProductUpdate({})
        setIsViewProduct(false)
    };
    const handleDiscount = (value) => {
        if (value === 'YES') {
            setIsDiscount(1)
        }
        else {
            form.setFieldsValue({ discount: '0' });
            setIsDiscount(0)
        }
    }
    return (
        <Modal
            className="modal-add modal-product"
            maskClosable={false}
            title="Add New Product"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            closable={true}
        >
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                    discount: '0',  // Giá trị mặc định cho trường discount
                    is_discount: 'NO',
                    description: ''
                }}
                // onFinish={ }
                autoComplete="off"
            >
                <Row wrap={true} gutter={16}>

                    <Form.Item
                        name="id"
                    >
                        <Input style={{ display: 'none' }} />
                    </Form.Item>
                    <Col span={18}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: `Please input product's name`,
                                }
                            ]}
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Input disabled={isViewProduct} />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Price (VND)"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: `Please input product's price`,
                                },
                                {
                                    pattern: /^-?\d*(\.\d+)?$/,
                                    message: 'Invalid discount format!'
                                }
                            ]}
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Input disabled={isViewProduct} />
                        </Form.Item>
                    </Col>


                    <Col span={5}>
                        <Form.Item
                            label="Is Discount"
                            name="is_discount"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select discount',
                                },
                            ]}
                        >
                            <Select disabled={isViewProduct} onChange={(value) => handleDiscount(value)}>
                                <Select.Option value="YES">YES</Select.Option>
                                <Select.Option value="NO">NO</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item

                            label="Discount (%)"
                            name="discount"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            rules={[
                                {
                                    pattern: /^-?\d+$/,
                                    message: 'Invalid discount format!'
                                }
                            ]}
                        >
                            <Input disabled={isDiscount === 0 || isViewProduct ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item

                            label="Type"
                            name="type"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select type',
                                },
                            ]}
                        >
                            <Select disabled={isViewProduct}>
                                {listType && listType.length > 0 &&
                                    listType.map((item, index) => {
                                        return (
                                            <Select.Option key={index} value={item.name}>
                                                {item.name}
                                            </Select.Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item

                            label="Quantity"
                            name="quantity"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            rules={[
                                {
                                    pattern: /^-?\d+$/,
                                    message: 'Invalid discount format!'
                                }
                            ]}
                        >
                            <Input disabled={isViewProduct} />
                        </Form.Item>
                    </Col>
                    <Col span={15}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            customRequest={({ file, onSuccess }) => {
                                setTimeout(() => {
                                    onSuccess("ok");
                                }, 0);
                            }}
                        >
                            {fileList.length >= 4 ? null : uploadButton}
                        </Upload>
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
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Description"
                            name="description"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <TextArea disabled={isViewProduct} rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className='btn-create'
                >
                    <Button onClick={handleCancel} className='btn-create' type="primary">
                        Cancel
                    </Button>
                    <Button className='btn-create' type="primary" htmlType="submit">
                        Save
                    </Button>

                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModalCreateProduct