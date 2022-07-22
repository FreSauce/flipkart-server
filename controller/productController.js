const Product = require("../model/Product");
const AppError = require("../AppError");

exports.addProduct = async (req, res, next) => {
  const body = req.body;
  let name = body.name;
  let description = body.description;
  let link = body.link;

  const product = new Product({
    name: name,
    description: description,
    link: link,
  });
  product
    .save()
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

exports.getProducts = async (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.status(200).json({
        status: "success",
        data: products,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.getParticularProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

exports.deleteProduct = async (req, res, next) => {
  let id = req.body.id;
  Product.findByIdAndRemove(id)
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

exports.updateProduct = (req, res, next) => {
  let id = req.body.id;
  let updatedName = req.body.name;
  let updatedDescription = req.body.description;
  let updatedLink = req.body.link;
  Product.findById(id)
    .then((product) => {
      product.name = updatedName;
      product.description = updatedDescription;
      product.link = updatedLink;
      return product.save();
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
