const jwt = require("jsonwebtoken");
const userRefreshTokenModel = require("../model/refreshTokenModel");

module.exports = {
  //=================== Token Generation Service ===================

  userTokenService: async (userId, role) => {

    const secret = process.env.USERSECRET_KEY;

    // Generate Access Token
    const accessToken = jwt.sign(
      {
        userId,
        role,
      },
      secret,
      { expiresIn: "1h" }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      {
        userId,
        role,
        date: Date.now(),
      },
      secret,
      { expiresIn: "7d" }
    );

    const existingRefreshToken = await userRefreshTokenModel.findOne({
      userId,
    });
    if (existingRefreshToken) {
      await userRefreshTokenModel.findByIdAndUpdate(existingRefreshToken._id, {
        token: refreshToken,
      });
    } else {
      const newRefreshToken = new userRefreshTokenModel({
        token: refreshToken,
        userId,
      });
      await newRefreshToken.save();
    }

    return { accessToken, refreshToken };
  },

  //=================== Refresh Token Verification ===================

  userRefreshToken: async (req, res) => {
    const authHeader = req?.headers?.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Access Token Not Found ❌" });
    }

    const refreshToken = req.body.refreshToken; 
    if (!refreshToken) {
      return res.status(422).json({ error: "Refresh Token Not Found ❌" });
    }

    const secret = process.env.USERSECRET_KEY;

    try {
      const decoded = jwt.verify(refreshToken, secret);
      const existingRefreshToken = await userRefreshTokenModel.findOne({
        userId: decoded.userId,
        token: refreshToken,
      });

      if (!existingRefreshToken) {
        return res.status(422).json({ error: "Invalid Refresh Token ❌" });
      }

      // Generate new tokens
      const newAccessToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role },
        secret,
        { expiresIn: "1h" }
      );

      const newRefreshToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role },
        secret,
        { expiresIn: "7d" }
      );

      await userRefreshTokenModel.findByIdAndUpdate(existingRefreshToken._id, {
        token: newRefreshToken,
      });

      return res.status(200).json({
        status: "success",
        message: "Tokens refreshed successfully",
        data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      });
    } catch (error) {
      return res
        .status(403)
        .json({ error: "Invalid or Expired Refresh Token ❌" });
    }
  },
};
