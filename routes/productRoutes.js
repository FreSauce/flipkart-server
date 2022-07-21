const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router.get("/getProducts", productController.getProducts);
router.post("/addProduct", productController.addProduct);
router.post('/deleteProduct', productController.deleteProduct);
module.exports = router;
