import { Modal, Form, Input, notification, Row, Col, Select, Button } from 'antd';
import '../../../styles/modalCreate.scss'
const ModalCreateUser = (props) => {
    const { isModalOpen, setIsModalOpen } = props
    const onFinish = async (values) => {
        const { email, password, firstName, lastName, role, phone, address } = values;
        console.log(email, password, firstName, lastName, role, phone, address)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
                            <Input.Password />
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
                    <Button className='btn-create' type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModalCreateUser