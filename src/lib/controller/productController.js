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

const getSellerProducts = async ({ id }) => {
    const product = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}//api/products/${id}`);
    const res = product.json();
    return res;
};

module.exports = {
    createProduct,
    getSellerProducts,
};