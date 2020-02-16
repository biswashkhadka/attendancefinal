const express = require('express');
const Attendance = require('../Models/AttendanceModel');
const router = express.Router();


router.post('/addAttendance', (req, res, next) => {
    // var attendance[]=req.body
    console.log(req.body);
    var students = req.body.students;

    if(students == undefined){
        students = req.body;
    }   
  console.log(students);
    for(student of students){
        if(student.absent == null || student.absent == undefined) {
            student.absent = false;
        }
        if(student.present == null || student.present == undefined) {
            student.present = false;
        }
        if(student.late == null || student.late == undefined) {
            student.late = false;
        }
        console.log(student);
        Attendance.create({
            
            students:student.fullname,
            present:student.present,
            absent:student.absent,
            late:student.late,
            
        }).then((note) => {
           console.log("success")
            res.json({ status: "Attendance done" });
        }).catch(next);
    }
        
    });

router.get('/',(req,res,next)=>{
    Attendance.find({},(err,note)=>{
        if (err) {
            res.json(next)
        }
        res.json(note)
    });
});


module.exports = router;