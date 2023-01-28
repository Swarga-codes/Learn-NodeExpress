const express = require('express');
const Joi = require('joi');
const app = express();
//middleware
// app.set("view engine","ejs");
//middleware
app.use(express.json());
const genres = [
    {id:1, name: "Comedy"},
    {id:2, name: "Horror"},
    {id:3, name: "Action"},
    {id:4, name: "Thriller"},
    {id:5, name: "Romance"},
];
app.get("/",(req,res)=>{
    res.status(200).send("Welcome to Vidly!");
});
app.get("/api/genres",(req,res)=>{
res.send(genres);
});
app.get("/api/genres/:id",(req,res)=>{
// res.send(`I am the genre with id of ${req.params.id}`);
const genre = genres.find(f => f.id === parseInt(req.params.id));
if(!genre) return res.status(404).send("The requested genre was not found!");
res.send(genre);
});
//POST Request
app.post("/api/genres/",(req,res) =>{
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
app.put("/api/genres/:id",(req,res)=>{
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
const port = process.env.PORT || 3000;
app.listen(port, () =>{
console.log(`Listening on port ${port}...`);
});
