const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSellerProducts = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const products = await Product.find({
            "sellerInfo.userId": sellerId,
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getSellerProducts,
};