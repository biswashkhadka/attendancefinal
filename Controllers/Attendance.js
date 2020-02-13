const express = require('express');
const Attendance = require('../Models/AttendanceModel');
const router = express.Router();


router.post('/addAttendance', (req, res, next) => {
    // var attendance[]=req.body
    
        Attendance.create({
            
            students:req.body.students,
            present:req.body.present,
            absent:req.body.absent,
            late:req.body.late
            
        }).then((note) => {
           
            res.json({ status: "Attendance done" });
        }).catch(next);
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