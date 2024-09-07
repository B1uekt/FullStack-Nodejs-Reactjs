import { Row, Col, Input } from 'antd';
import '../../styles/footer.scss'
import LogoHeader from '../../assets/images/logo.png'
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, FacebookFilled, InstagramFilled } from '@ant-design/icons';
const Footer = () => {
    return (
        <>
            <Row style={{ height: '100%' }}>
                <Col className='left-header' span={6}>
                    <div className="left-content">
                        <div className='logo-footer'>
                            <img src={LogoHeader}></img>

                        </div>
                        <ul className='content'>
                            <li>
                                <EnvironmentOutlined /> 273 An Dương Vương, Phường 2, Quận 5, Thành phố Hồ Chí Minh
                            </li>
                            <li>
                                <PhoneOutlined /> 0123 456 789
                            </li>
                            <li>
                                <MailOutlined /> khanhthi0211@gmail.com
                            </li>
                        </ul>

                    </div>
                </Col>
                <Col className='left-header' span={6}>
                    <div className="left-content">

                    </div>
                </Col>
                <Col className='middle-header' span={6}>
                    <div className="middle-content">
                        <h3>
                            LIÊN KẾT
                        </h3>
                        <ul>
                            <li>
                                <FacebookFilled /> FACEBOOK
                            </li>
                            <li>
                                <InstagramFilled /> INSTAGRAM
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col className='middle-header' span={6}>
                    <div className="middle-content">
                        <h3>
                            ĐĂNG KÍ NHẬN TIN
                        </h3>
                        <ul>
                            <li>
                                Nhận thông tin sản phẩm mới nhất, tin khuyến mãi và nhiều hơn nữa.
                            </li>
                            <li>
                                <Input className='input' placeholder="Email của bạn" variant="borderless" />
                            </li>
                            <li>
                                <button className='btn-register'>ĐĂNG KÝ</button>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default Footer