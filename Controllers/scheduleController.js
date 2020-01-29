const express = require('express');
const Schedule = require('../Models/Schedule');
const router = express.Router();


router.post('/addSchedule', (req, res, next) => {
    
        Schedule.create({
            
            day:req.body.day,
            subject:req.body.subject,
            date:req.body.date
            
        }).then((user) => {
           
            res.json({ status: "Schedule added success!" });
        }).catch(next);
    });

router.get('/',(req,res,next)=>{
    Schedule.find({},(err,schedules)=>{
        if (err) {
            res.json(next)
        }
        res.json(schedules)
    });
});


module.exports = router;