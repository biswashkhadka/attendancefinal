const express = require('express');
const Student = require('../Models/StudentModel');
const router = express.Router();


router.post('/student', (req, res, next) => {
    
        Student.create({  
            fullname:req.body.fullname,
            address:req.body.address,
            email:req.body.email,
            batch:req.body.batch,
            admissionnum: req.body.admissionnum,
            IOT:req.body.IOT,
            Android:req.body.Android,
            API:req.body.API
            
        }).then((student) => {
           
            res.json({ status: "Student added success!" });
        }).catch(next);
    });

router.route("/student")
    .get(function(req, res){
        Student.find(function(err, foundproducts){
            if(!err){
                res.json(foundproducts);
            }else{
                console.log(err)
            }

        

        });
    });
router.route("/student/IOT")
    .get(function (req,res){
            Student.find({IOT:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    })

    router.route("/student/Android")
    .get(function (req,res){
            Student.find({Android:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    })

    router.route("/student/API")
    .get(function (req,res){
            Student.find({API:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    })

 router.route("/student/:id")
 .delete(function(req,res,next){
    Student.findByIdAndDelete({_id:req.params.id},function(err){
        if (!err){
            res.json("successfully deleted");
        }
        else{
            res.send(err);
        }
       
    })
 });

 router.put('/update/:id', (req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((student) => {
            res.json(student);
        }).catch(next);
})

 router.get('/my/:id',(req, res, next) => {
        Student.findById({ _id: req.params.id })
            .then((student) => {
                res.json(student)
            }).catch(next);
    })

module.exports = router;