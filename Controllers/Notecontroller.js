const express = require('express');
const Note = require('../Models/Note');
const router = express.Router();


router.post('/addNote', (req, res, next) => {
    
        Note.create({
            
            title:req.body.title,
            message:req.body.message,
            
        }).then((note) => {
           
            res.json({ status: "Note added success!" });
        }).catch(next);
    });

router.get('/',(req,res,next)=>{
    Note.find({},(err,notes)=>{
        if (err) {
            res.json(next)
        }
        res.json(notes)
    });
});

router.delete("/:id",(req,res,next)=>
{
    Note.findByIdAndDelete({_id:req.params.id})
    .then((result)=>
    {
        res.json({"message":"deleted sucessfully"})
    })
    .catch(next)
})



router.get('/my/:id',(req, res, next) => {
        Note.findById({ _id: req.params.id })
            .then((note) => {
                res.json(note)
            }).catch(next);
    })


router.put('/:id', (req, res, next) => {
    Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((note) => {
            res.json(note);
        }).catch(next);
})
// router.put("/:id",(req,res,next)=>{
//     Note.findByIdAndUpdate({_id:req.params.id},req.body)
//     .then(()=>{
//         Note.findOne({_id:req.params.id})
//         .then((note)=>{
//             res.json(note)
//         })
//     })
//     .catch(next)
// })

// router.route("/update/:id")
// .put((req, res, next) => {
//         Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//             .then((note) => {
//                 res.json(note);
//             }).catch(next);
//     })


module.exports = router;