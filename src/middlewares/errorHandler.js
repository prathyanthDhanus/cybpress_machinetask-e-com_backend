const AppError = require("./appError");

const errorHandler = (err, req, res, next) => {
  // Check if the error is an instance of AppError
  if (err instanceof AppError) {
    return res.status(err.StatusCode).json({
      status: err.status,
      errorMessage: err.ErrorMessage || "Something went wrong",
    });
  }

  // Generic error handling for unexpected errors
  res.status(500).json({
    status: "error",
    errorMessage: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;
