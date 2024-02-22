const express = require('express');
const router = express.Router();
const multer = require('multer');
const ImageController = require('../controllers/imageController');
const ProductController = require('../controllers/productController');

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Route for uploading an image
router.post('/upload-image', upload.single('image'), ImageController.uploadImage);

// Route for retrieving an image
router.get('/image/:imageName', ImageController.getImage);

// Route for creating a new product
router.post('/products', ProductController.createProduct);

// Route for getting all products
router.get('/products', ProductController.getAllProducts);

// Route for getting a single product by ID
router.get('/products/:productId', ProductController.getProductById);

// Route for updating a product
router.put('/products/:productId', ProductController.updateProduct);

// Route for deleting a product
router.delete('/products/:productId', ProductController.deleteProduct);

module.exports = router;
