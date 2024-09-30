const { getTypeService } = require('../services/typeService')
const getAllType = async (req, res) => {
    const data = await getTypeService()
    return res.status(200).json(data)
}
module.exports = { getAllType } 