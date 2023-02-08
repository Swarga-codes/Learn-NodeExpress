const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.render('index', {title:'Intro',message:'Hello Boi!'});
});
module.exports=router;