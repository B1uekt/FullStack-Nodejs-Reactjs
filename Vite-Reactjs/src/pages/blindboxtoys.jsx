import { useEffect, useState } from 'react';
import '../styles/blindboxtoys.scss'
import { Row, Col, Radio, notification } from 'antd';
import { getAllProduct } from '../services/ProductServiecs';
import { Buffer } from 'buffer';
const BlindBox = () => {
    const [value, setValue] = useState(1);
    const [dataProduct, setDataProduct] = useState([]);

    const bufferToBase64 = (buffer) => {
        const imageBuffer = Buffer.from(buffer);
        return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    };


    useEffect(() => {
        const fetchListProduct = async () => {
            const res = await getAllProduct();
            console.log(res)
            if (res && res.EC === 0 && Array.isArray(res.result)) {
                console.log(res)
                const productsWithBase64 = await Promise.all(
                    res.result.map(async (product) => {
                        const imageBase64 = product.image ? await bufferToBase64(product.image) : null;
                        const thumbnail1Base64 = product.thumbnail_1 ? await bufferToBase64(product.thumbnail_1) : null;
                        const thumbnail2Base64 = product.thumbnail_2 ? await bufferToBase64(product.thumbnail_2) : null;
                        const thumbnail3Base64 = product.thumbnail_3 ? await bufferToBase64(product.thumbnail_3) : null;
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
                            typeName: product.Type.name
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

        fetchListProduct();
    }, []);





    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className="container">
            <Row wrap={true} gutter={16}>
                <Col className='col-push' span={6}>
                    <div className="left-content sidebar">
                        <div className='aside-title'>
                            <h3>DANH MỤC</h3>
                        </div>
                        <div className='aside-content'>

                        </div>
                    </div>
                </Col>
                <Col className='col-push' span={18}>
                    <div className="main-content collection">
                        <div className='sort-cate'>
                            <h3>Xếp theo:</h3>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>Tên A-Z</Radio>
                                <Radio value={2}>Tên Z-A</Radio>
                                <Radio value={3}>Hàng mới</Radio>
                                <Radio value={4}>Giá thấp đến cao</Radio>
                                <Radio value={5}>Giá cao đến thấp</Radio>
                            </Radio.Group>
                        </div>
                        <div className='products-view'>
                            <Row wrap={true} gutter={16}>
                                {
                                    dataProduct && dataProduct.length > 0 &&
                                    dataProduct.map((item, index) => {
                                        return (
                                            <Col key={`${index}-product`} className='product-card' span={8}>
                                                <div className='product-img'>
                                                    <img src={item.image} alt={`${item.name} image`} />
                                                </div>
                                                <div className='product-content'>
                                                    <h4 className='product-series'>{item.typeName}</h4>
                                                    <h3 className='product-title'>{item.name}</h3>
                                                    <h4 className='product-price'>{new Intl.NumberFormat('de-DE').format(item.price)}</h4>
                                                </div>
                                                <div className='product-hover'>
                                                    <div className='hover-content'>
                                                        <p>Thêm vào giỏ hàng</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default BlindBox