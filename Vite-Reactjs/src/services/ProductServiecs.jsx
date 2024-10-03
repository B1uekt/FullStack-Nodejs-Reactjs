import axios from "../util/axiosCusomize"

const getAllProduct = () => {
    return axios.get("v1/api/collection/all")
}
const postNewProduct = (name, price, isDiscountValue, discount, description, type, fileList, quantity) => {
    const data = new FormData();

    data.append('name', name);
    data.append('price', price);
    data.append('is_discount', isDiscountValue);
    data.append('discount_percent', discount);
    data.append('description', description);
    data.append('type', type);
    data.append('quantity', quantity);
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
const putProduct = (id, name, price, isDiscountValue, discount, description, type, fileList, quantity) => {
    console.log(quantity)
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('price', price);
    data.append('is_discount', isDiscountValue);
    data.append('discount_percent', discount);
    data.append('description', description);
    data.append('type', type);
    data.append('quantity', quantity);
    fileList.forEach((file) => {
        if (file.originFileObj) {
            data.append('images', file.originFileObj);
        }
    });

    return axios.put("/v1/api/updateProduct", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


const deleteProduct = (productId) => {
    return axios.delete("v1/api/deleteProduct", { data: { id: productId } })
}

export { getAllProduct, postNewProduct, putProduct, deleteProduct }