const User = require("../model/userSchema");
const AppError = require("../../../middlewares/appError");
const bcrypt = require("bcrypt");
const { userTokenService } = require("./common");

module.exports = {

  //  ===================== register function (user/admin) =========================

  registerAuthDb: async (userData) => {
    const findUser = await User.findOne({ email: userData.email });
    if (findUser) {
      throw new AppError(
        "User already exists",
        "Field validation error : A user with this email already exists",
        409
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const saveData = new User({
      ...userData,
    });
    await saveData.save();
    return saveData;
  },

  //  ===================== login function (user/admin) =========================

  loginAuthDb: async (email, password) => {

    const findUser = await User.findOne({ email: email });
   
    if (!findUser) {
      throw new AppError(
        "User not found.Please verify your email address",
        "Authentication error : User not found with this email",
        404
      );
    }

    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword) {
      throw new AppError(
        "Wrong password",
        "Authentication error : Wrong password",
        401
      );
    }
    const generateToken = await userTokenService(findUser._id,findUser.role);
    return generateToken;
  },
};
