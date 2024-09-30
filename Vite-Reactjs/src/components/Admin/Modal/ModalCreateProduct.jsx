import { Upload, Modal, Form, Input, Row, Col, Select, Button, Image, notification } from 'antd';
import '../../../styles/modalCreate.scss'
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { getAllType } from '../../../services/TypeServices';
import { postNewProduct } from '../../../services/ProductServiecs';
const ModalCreateProduct = (props) => {
    const { isModalOpen, setIsModalOpen } = props
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [isDiscount, setIsDiscount] = useState(false)
    const [listType, setListType] = useState([])
    const [isDiscountValue, setIsDiscountValue] = useState("0")
    useEffect(() => {
        const fetchType = async () => {
            const res = await getAllType()
            if (res && res.result) {
                setListType(res.result)
            }
        }
        fetchType()
    }, [])

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
        console.log(fileList)
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

    const convertBase64toBlob = (fileList) => {
        const blobs = fileList.map(image => {
            const base64Data = image.thumbUrl.replace(/^data:image\/png;base64,/, ""); // Bỏ tiền tố
            const binaryString = window.atob(base64Data); // Giải mã chuỗi base64 thành nhị phân
            const len = binaryString.length;
            const bytes = new Uint8Array(len); // Tạo Uint8Array để lưu dữ liệu nhị phân

            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i); // Gán từng ký tự thành byte
            }

            return new Blob([bytes], { type: 'image/png' }); // Tạo Blob từ Uint8Array
        });
        return blobs;
    }

    const onFinish = async (values) => {
        const { name, price, is_discount, discount, description, type } = values;
        if (is_discount === 'YES') {
            setIsDiscountValue("1")
        }
        // console.log(name, price, isDiscountValue, discount, description, type)
        // const arrayBlob = convertBase64toBlob(fileList)
        console.log(fileList)
        const res = await postNewProduct(name, price, isDiscountValue, discount, description, type, fileList)
        console.log(res)
        if (res && res.EC === 0) {
            notification.success({
                message: "Create Product succeed!",
                description: res.EM,
            })
            handleCancel()
        }
        else {
            notification.error({
                message: "Create product fail",
                description: res.EM,
            })
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([])
    };
    const handleDiscount = (value) => {
        if (value === 'YES') {
            setIsDiscount(true)
        }
        else {
            form.setFieldsValue({ discount: '0' });
            setIsDiscount(false)
        }
    }
    return (
        <Modal
            className="modal-add"
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
                            <Input />
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
                            <Input />
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
                            <Select onChange={(value) => handleDiscount(value)}>
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
                            <Input disabled={isDiscount === false} />
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
                            <Select>
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
                            <TextArea rows={4} />
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