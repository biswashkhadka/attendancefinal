const jwt = require('jsonwebtoken');
const Teacher = require('./Models/teacher');

module.exports.verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set!");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    Teacher.findById(data._id)
        .then((teacher) => {
            req.teacher = teacher;
            next();
        })
}
module.exports.verifyAdmin = (req, res, next) => {
    if (!req.teacher) {
        let err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }
    if (req.teacher.admin !== true) {
        let err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    next();
}