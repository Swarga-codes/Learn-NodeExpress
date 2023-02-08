const express=require('express');
const router=express.Router();
const genres = [
    {id:1, name: "Comedy"},
    {id:2, name: "Horror"},
    {id:3, name: "Action"},
    {id:4, name: "Thriller"},
    {id:5, name: "Romance"},
];
router.get("/",(req,res)=>{
    res.send(genres);
    });
    router.get("/:id",(req,res)=>{
    // res.send(`I am the genre with id of ${req.params.id}`);
    const genre = genres.find(f => f.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The requested genre was not found!");
    res.send(genre);
    });
    //POST Request
    router.post("/",(req,res) =>{
        const schema = Joi.object({
            name:Joi.string().min(5).required(),
        });
        const result = schema.validate(req.body);
        if(result.error){
            return res.status(400).send(result.error.details[0].message);
        }
       const genre = {
        id:genres.length+1,
        name:req.body.name,
       };
       genres.push(genre);
       res.send(genres);
    });
    //PUT Request
    router.put("/:id",(req,res)=>{
    //whether the id exists or not
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send("The requested ID was not found!");
    }
    //validate the given update
    const schema = Joi.object({
        name:Joi.string().min(5).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
    return res.status(404).send(result.error.details[0].message);
    }
    genre.name=req.body.name;
    res.send(genre);
    });
    //DELETE Request
    router.delete("/:id",(req,res)=>{
    //find the genre to be deleted
    const genre=genres.find(g=> g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send("The requested genre is not found");
    const ind=genres.indexOf(genre);
    genres.splice(ind,1);
    res.send(genre);
    });
    module.exports=router;