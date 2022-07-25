const Cart = require("../model/Cart");
const AppError = require("../AppError");
const { sendMail } = require("../utils");

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

exports.checkOut = async (req, res, next) => {
  let userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId }).populate('item.productId');
    const items = cart.items.map(i => ({ quantity: i.quantity, ...i.productId }));
    await sendMail(req.user.email, items);
    res.status(200).json({ message: 'Cart Checked Out' });
  } catch (err) {
    console.log(err);
    next(new AppError(err.message, 500));
  }
}