const express = require('express');
const app = express();
//middleware
// app.set("view engine","ejs");
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
const port = process.env.PORT || 3000;
app.listen(port, () =>{
console.log(`Listening on port ${port}...`);
});
