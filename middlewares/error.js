const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Log to console for dev
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        let message = "Duplicate field value entered"
        let type="DUPLICATE_FIELD"    
        /* if (err.keyPattern.phone) {
            message = "This phone already exists"
            type = "EXISTS_PHONE"
        }

        */
        error = new ErrorResponse(message, 400, type);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message || 'Server Error', type: error.type || '' });
}

module.exports = errorHandler;
