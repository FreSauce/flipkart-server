const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("logout", authController.logout);

router.post(
  "/sendCharacterData",
  authController.protect,
  userController.storeCharacterData
);

router.get(
  "/getCharacterData",
  authController.protect,
  userController.getCharacterData
);

module.exports = router;
