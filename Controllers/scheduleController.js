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

router.delete("/:id",(req,res,next)=>
{
    Schedule.findByIdAndDelete({_id:req.params.id})
    .then((result)=>
    {
        res.json({"message":"deleted sucessfully"})
    })
    .catch(next)
})

router.get('/my/:id',(req, res, next) => {
        Schedule.findById({ _id: req.params.id })
            .then((us) => {
                res.json(us)
            }).catch(next);
    })


// router.put('/update/:id', (req, res, next) => {
//     Schedule.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//         .then((schedule) => {
//             res.json(schedule);
//         }).catch(next);
// })

router.put('/:id', (req, res, next) => {
    Schedule.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((us) => {
            res.json(us);
        }).catch(next);
})

// router.route("/update/:id")
// .put((req, res, next) => {
//         Schedule.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//             .then((schedules) => {
//                 res.json(schedules);
//             }).catch(next);
//     })


module.exports = router;