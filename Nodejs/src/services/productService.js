const db = require('../models/index');

const getAllProductService = async () => {
    try {
        let result = await db.Product.findAll({
            include: {
                model: db.Type,
                attributes: ['name']
            }
        });

        return {
            result,
            EC: 0,
            EM: 'Success',
        };
    } catch (error) {
        console.error('Error fetching products:', error);


        return {
            EC: 1,
            EM: 'Failed to fetch products',
            error: error.message,
        };
    }
};


const postProductService = async (name, price, is_discount, discount_percent, files, description, type) => {
    try {
        // Tìm `typeId` từ database dựa trên tên type
        const typeRecord = await db.Type.findOne({
            where: { name: type },
            attributes: ['id'],
        });

        if (!typeRecord) {
            return { EC: 1, EM: 'Type not found' };
        }

        const productData = {
            name,
            price,
            is_discount,
            discount_percent,
            description,
            typeId: typeRecord.id,
        };

        // Nếu có files, thêm hình ảnh và các thumbnails vào productData
        if (files && files.length > 0) {
            productData.image = files[0]?.buffer; // Lấy file đầu tiên làm hình ảnh chính
            files.slice(1).forEach((file, index) => {
                if (index === 0) productData.thumbnail_1 = file.buffer;
                if (index === 1) productData.thumbnail_2 = file.buffer;
                if (index === 2) productData.thumbnail_3 = file.buffer;
            });
        }

        const result = await db.Product.create(productData);

        return {
            result,
            EC: 0,
            EM: 'Success',
        };
    } catch (error) {
        console.error('Error creating product:', error);
        return {
            EC: 1,
            EM: 'Failed to create new product',
            error: error.message
        };
    }
};

module.exports = { getAllProductService, postProductService };
