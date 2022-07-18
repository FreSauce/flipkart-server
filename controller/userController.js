const User = require("../model/User");
const AppError = require("../AppError");

exports.storeCharacterData = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        character_data: req.body.character_data,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    next(new AppError(err.message, 500));
  }
};

exports.getCharacterData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    next(new AppError(err.message, 500));
  }
};
