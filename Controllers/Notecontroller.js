const express = require('express');
const Note = require('../Models/Note');
const router = express.Router();


router.post('/addNote', (req, res, next) => {
    
        Note.create({
            
            title:req.body.title,
            message:req.body.message,
            
        }).then((user) => {
           
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


module.exports = router;