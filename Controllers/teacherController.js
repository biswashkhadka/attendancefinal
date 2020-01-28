const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../Models/teacher');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
        err.status = 500;
        return next(err);
        }
        Teacher.create({
            
            fullname:req.body.fullname,
            address:req.body.address,
            module:req.body.module,
            email:req.body.email,
            username:req.body.username,
            password: hash,
            image: req.body.image
        }).then((teacher) => {
            let token = jwt.sign({ _id: teacher._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    Teacher.findOne({ username: req.body.username })
        .then((teacher) => {
            if (teacher == null) {

                let err = new Error('username not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, teacher.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: teacher._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req,res,next) =>{
    res.json({_id:req.teacher._id,image:req.teacher.image});
});

router.get('/',(req,res,next)=>{
    Teacher.find({},(err,teachers)=>{
        if (err) {
            res.json(next)
        }
        res.json(teachers)
    });
});


module.exports = router;