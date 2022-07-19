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
    const parsedCharacterData = JSON.parse(user.character_data);
    // console.log(parsedCharacterData["settingsName"]);
    // console.log(2);
    let characterType;
    if (parsedCharacterData["settingsName"] === "FemaleSettings")
      characterType = "Female";
    if (parsedCharacterData["settingsName"] === "MaleSettings")
      characterType = "Male";
    res.status(200).json({
      status: "success",
      characterData: user.character_data,
      name: user.name,
      characterType,
    });
  } catch (err) {
    console.log(err);
    next(new AppError(err.message, 500));
  }
};
