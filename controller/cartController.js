const Cart = require("../model/Cart");
const AppError = require("../AppError");

exports.addToCart = (req, res, next) => {
  let productId = req.params.productId;
  let userId = req.user._id;
  Cart.findOne({ userId: userId })
    .then((cart) => {
      if (cart === null) {
        const cart = new Cart({
          userId: userId,
          items: [
            {
              productId: productId,
              quantity: 1,
            },
          ],
        });
        return cart.save();
      } else {
        console.log(cart);
        return cart.addToCart(productId);
      }
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.decByOne = (req, res, next) => {
  let productId = req.params.productId;
  let userId = req.user._id;
  Cart.findOne({ userId: userId })
    .then((cart) => {
      return cart.decreaseFromCart(productId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.deleteFromCart = (req, res, next) => {
  let productId = req.params.productId;
  let userId = req.user._id;
  Cart.findOne({ userId: userId })
    .then((cart) => {
      return cart.removeFromCart(productId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};
