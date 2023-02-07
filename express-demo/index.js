const Joi=require('joi');
const express=require('express');
const app=express();
const logger=require('./logger');
const auth = require('./auth');
const helmet=require('helmet');
const morgan=require('morgan');
//using middleware
app.use(express.json());
//using custom middlewares
app.use(logger);
app.use(auth);
//using built in middlewares
app.use(express.urlencoded({extended:true})); // used for parsing req of forms that is of key=value&key=value
//extended is used so that it can parse arrays or any other complex objects
app.use(express.static("public")); //used to display static content or pages
app.use(helmet()); // secures our app by including various HTTP headers
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
if(app.get('env')==='development'){
    app.use(morgan('tiny')); //gives details about the requests made
    console.log("Morgan Enabled....");
}
const courses=[
    {id:1,name:"Machine Learning"},
    {id:2,name:"Data Science"},
    {id:3,name:"Web Development"},
];
app.get('/',(req,res)=>{
    res.send("Hello Boi!!");
});
app.get('/api/courses/',(req,res)=>{
    // res.send(["Machine Learning","Data Science","Web Development"]);
    res.send(courses);
});
app.post('/api/courses/',(req,res)=>{
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
app.put('/api/courses/:id',(req,res)=>{
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
app.get("/api/courses/:id",(req,res)=>{
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course){
    res.status(404).send("The course with the given ID is not found!");
}
res.send(course);
// res.send(course.name);
});
//app.get("/api/courses/:name/:language",(req,res)=>{
    // res.send(req.params);
    // res.send(req.params.name+req.params.language);
//    res.send(req.query);
//});
app.delete('/api/courses/:id',(req,res)=>{
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
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));