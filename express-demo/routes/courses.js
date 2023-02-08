const express=require('express');
const router=express.Router();
const courses=[
    {id:1,name:"Machine Learning"},
    {id:2,name:"Data Science"},
    {id:3,name:"Web Development"},
];
router.get('/',(req,res)=>{
    // res.send(["Machine Learning","Data Science","Web Development"]);
    res.send(courses);
});
router.post('/',(req,res)=>{
    const{error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // const schema=Joi.object({
    //     name:Joi.string().min(3).required(),
    // });
    // const result= schema.validate(req.body);
    // console.log(result);
    // if(!req.body.name || req.body.name.length<3){
    //     if(result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
const course = {
    id:courses.length+1,
    name:req.body.name,
}
courses.push(course);
res.send(course);
});
router.put('/:id',(req,res)=>{
    //checking for a valid id
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id is not found!");
    // const result=validateCourse(req.body);
    const{error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name=req.body.name;
    res.send(course);
});
router.get("/:id",(req,res)=>{
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course){
    res.status(404).send("The course with the given ID is not found!");
}
res.send(course);
// res.send(course.name);
});
//router.get("/api/courses/:name/:language",(req,res)=>{
    // res.send(req.params);
    // res.send(req.params.name+req.params.language);
//    res.send(req.query);
//});
router.delete('/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found!");
const index=courses.indexOf(course);
courses.splice(index,1);
res.send(course);
});
function validateCourse(course){
    const schema=Joi.object({
        name:Joi.string().min(3).required(),
    });
    return schema.validate(course);
}
module.exports=router;