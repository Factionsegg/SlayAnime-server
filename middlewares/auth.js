const jwt = require('jsonwebtoken')
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.get('Authorization');

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        console.log(token.red);
    }

    if (!token) {
        
        return (next(new ErrorResponse('Not authorized', 401, 'NOT_AUTHORIZED')))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded :>> ', decoded);
        req.uid = decoded.id;
        next();
    } catch (err) {
        return (next(new ErrorResponse('Not authorized', 401, 'NOT_AUTHORIZED')))
    }
});