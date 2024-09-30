const { getAllProductService, postProductService } = require('../services/productService')

const getAllProduct = async (req, res) => {
    const data = await getAllProductService()
    return res.status(200).json(data)
}

const postCreateNewProduct = async (req, res) => {
    const { name, price, is_discount, discount_percent, description, type } = req.body
    const files = req.files;
    console.log(name, price, is_discount, discount_percent, description, type, files)
    const data = await postProductService(name, price, is_discount, discount_percent, files, description, type)
    return res.status(200).json(data)
}
module.exports = { getAllProduct, postCreateNewProduct }