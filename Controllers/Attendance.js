const express = require('express');
const Attendance = require('../Models/AttendanceModel');
const router = express.Router();


router.post('/addAttendance', (req, res, next) => {
    // var attendance[]=req.body
    console.log(req.body);
    var students = req.body;
    for(student of students){
        console.log(student);
        Attendance.create({
            
            students:student.fullname,
            present:student.present,
            absent:student.absent,
            late:student.late
            
        }).then((note) => {
           console.log("success")
            res.json({ status: "Attendance done" });
        }).catch(next);
    }
        
    });

router.get('/',(req,res,next)=>{
    Attendance.find({},(err,notes)=>{
        if (err) {
            res.json(next)
        }
        res.json(notes)
    });
});


module.exports = router;