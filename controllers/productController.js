const Product = require('../models/Product');

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Implement logic to create a new product
    createProduct: async (req, res) => {
        const {
            productId, 
            productName,
            qty,
            description,
            productImage,
            price
        } = req.body;

        try {
            const existingProduct = await Product.findOne({ productId });

            if (existingProduct) {
                const exists = statusCode.ALREADY_EXISTS;
                return res.status(exists.statuscode).json({
                    exists,
                });
            } else {
                // Create and save the new product
                const newItem = new Product({
                    productId,
                    productName,
                    qty,
                    description,
                    productImage,
                    price
                });

                const item = await newItem.save();
                console.log(item);
                return res.status(success.statuscode).json({
                    success,
                    item,
                });
            }
        } catch (err) {
            return res.send(err)
        }
    },

    // Implement logic to update product
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const { productName, qty, description } = req.body;

            const findProduct = await Product.findOne({ productId });

            if (!findProduct) {
                return res.status(notFound.statuscode).json({
                    notFound,
                });
            }

            const updateItem = await Product.updateOne(
                { productId },
                { $set: { productName, qty, description } }
            );

            return res.status(success.statuscode).json({
                success,
                updateItem,
            });
        } catch (err) {
            return res.send(err);
        }
    },

        productImage: async (req, res) => {
try {
    
} catch (error) {
    
}
        },
    // Implement logic to delete product
    deleteProduct: async (req, res) => {
        try {
            const findProduct = await Product.findOne({
                productId: req.params.productId,
            });
            if (!findProduct) {
                return res.status(notFound.statuscode).json({
                    notFound,
                });
            } else {
            const deleteItem = await Product.deleteOne({
                productId: req.params.productId,
            });
            return res.status(success.statuscode).json({success,deleteItem,});
            }
        } catch (err) {
            return res.send(err)
        }
     }
};

module.exports = ProductController;
