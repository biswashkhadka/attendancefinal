const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/StudentModel');
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
        User.create({
            
            fullname:req.body.fullname,
            address:req.body.address,
            phoneno:req.body.phoneno,
            email:req.body.email,
            batch:req.body.batch,
            password: hash,
            image: req.body.image
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {

                let err = new Error('Email not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req,res,next) =>{
    res.json({_id:req.user._id,image:req.user.image});
});

router.get('/',(req,res,next)=>{
    User.find({},(err,users)=>{
        if (err) {
            res.json(next)
        }
        res.json(users)
    });
});


module.exports = router;