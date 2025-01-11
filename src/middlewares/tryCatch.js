const AppError = require('./appError');

const tryCatch = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);  // Execute the controller
    } catch (error) {
      // Check if the error is an instance of AppError
      if (error instanceof AppError) {
        return res.status(error.StatusCode).json({
          status: error.status,
          message: error.ErrorMessage,
        });
      } else {
        // Handle generic errors (unexpected ones)
        return next(error);  // Pass the error to the error handler middleware
      }
    }
  };
};

module.exports = tryCatch;
