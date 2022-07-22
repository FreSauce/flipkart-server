const express = require("express");

const authController = require("../controller/authController");
const productController = require("../controller/productController");

const router = express.Router();

router.get("/getProducts", productController.getProducts);
router.post("/addProduct", productController.addProduct);
router.get("/getProduct/:id", productController.getParticularProduct);
router.post("/deleteProduct", productController.deleteProduct);
module.exports = router;
