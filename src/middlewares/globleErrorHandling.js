import { AppError } from "../utils/AppError.js";

const developmentError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const notFoundError = (err) => {
  return new AppError("The requested resource is not available", 404);
};

const productionError = (err, res) => {
  if (err?.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: err.status,
      message: "something went wrong",
    });
  }
};

export const errorHandling = (err, req, res, next) => {
  err.statusCode = err?.statusCode || 500;
  err.status = err?.status || "error";
  err.message = err?.message || "Something Went Wrong";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  }
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error?.statusCode == 404) {
      error = notFoundError(err);
    }

    productionError(error, res);
  }
};
