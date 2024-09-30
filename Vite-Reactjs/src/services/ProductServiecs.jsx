import axios from "../util/axiosCusomize"

const getAllProduct = () => {
    return axios.get("v1/api/collection/all")
}
const postNewProduct = (name, price, isDiscountValue, discount, description, type, fileList) => {
    const data = new FormData();

    data.append('name', name);
    data.append('price', price);
    data.append('is_discount', isDiscountValue);
    data.append('discount_percent', discount);
    data.append('description', description);
    data.append('type', type);

    // if (blobImages && blobImages.length > 0) {
    //     blobImages.forEach((blob, index) => {
    //         data.append('images', blob, `image_${index}.png`);
    //     });
    // }
    fileList.forEach((file) => {
        if (file.originFileObj) {
            data.append('images', file.originFileObj);
        }
    });

    return axios.post("/v1/api/createProduct", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export { getAllProduct, postNewProduct }