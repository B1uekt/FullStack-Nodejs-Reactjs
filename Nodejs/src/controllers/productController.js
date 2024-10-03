const { getAllProductService, postProductService, putProductService, deleteProductService } = require('../services/productService')

const getAllProduct = async (req, res) => {
    const data = await getAllProductService()
    return res.status(200).json(data)
}

const postCreateNewProduct = async (req, res) => {
    const { name, price, is_discount, discount_percent, description, type, quantity } = req.body
    const files = req.files;
    // console.log(name, price, is_discount, discount_percent, description, type, files)
    const data = await postProductService(name, price, is_discount, discount_percent, files, description, type, quantity)
    return res.status(200).json(data)
}

const putUpdateProduct = async (req, res) => {
    const { id, name, price, is_discount, discount_percent, description, type, quantity } = req.body
    const files = req.files;
    // console.log(id, name, price, is_discount, discount_percent, description, type, quantity)
    const data = await putProductService(id, name, price, is_discount, discount_percent, files, description, type, quantity)
    return res.status(200).json(data)
}

const deleteProduct = async (req, res) => {
    const { id } = req.body
    const data = await deleteProductService(id)
    return res.status(200).json(data)
}
module.exports = { getAllProduct, postCreateNewProduct, putUpdateProduct, deleteProduct }