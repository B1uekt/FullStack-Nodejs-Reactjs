import { Modal, Form, Input, notification, Row, Col, Select, Button } from 'antd';
import '../../../styles/modalCreate.scss'
import { postCreateUser } from '../../../services/UserServices';
const ModalCreateUser = (props) => {
    const { isModalOpen, setIsModalOpen, fetchListUSer } = props
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const { email, password, firstName, lastName, role, phone, address } = values;

        const res = await postCreateUser(firstName, lastName, email, password, role, phone, address)
        console.log(res)
        fetchListUSer()
        setIsModalOpen(false);
        form.resetFields();

    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <Modal
            className="modal-add"
            maskClosable={false}
            title="Add New User"
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
                }}
                // onFinish={ }
                autoComplete="off"
            >
                <Row wrap={true} gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Invalid email format!'
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
                    <Col span={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
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
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
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
                    <Col span={8}>
                        <Form.Item
                            label="Role"
                            name="role"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a role!',
                                },
                            ]}
                        >
                            <Select>
                                <Select.Option value="ADMIN">ADMIN</Select.Option>
                                <Select.Option value="USER">USER</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!',
                                },
                                {
                                    pattern: /^(0|\+84)(3|5|7|8|9)\d{8}$/,
                                    message: 'Invalid phone format!'
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
                    <Col span={8}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
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
export default ModalCreateUser