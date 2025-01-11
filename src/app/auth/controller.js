const { registerAuthDb,loginAuthDb } = require("./services/db");

module.exports = {

  //  ===================== register function (user/admin) =========================

  registerAuth: async (req, res) => {

    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const userData = { username, email, password, role };
    const saveData = await registerAuthDb( userData );
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: saveData,
    });
  },

  //  ===================== login function (user/admin) =========================

  loginAuth: async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const token = await loginAuthDb( email, password );
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: token,
    });
  },
};
