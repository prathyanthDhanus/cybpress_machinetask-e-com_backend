class AppError extends Error {
  constructor(ErrorMessage, Message, StatusCode) {
    super(Message);
    this.ErrorMessage = ErrorMessage;
    this.StatusCode = StatusCode;
    this.status = `${StatusCode}`.startsWith("4") ? "fail" : "error"; // Status based on code
    this.isOperational = true; // Marks this as an operational error
    Error.captureStackTrace(this, this.constructor); // Captures the stack trace
  }
}

module.exports = AppError;
