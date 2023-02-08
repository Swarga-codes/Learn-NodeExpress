const express = require('express');
const Joi = require('joi');
const app = express();
const genres=require('./routes/genres');
const home=require('./routes/home');
//middleware
app.set("view engine","ejs");
//middleware
app.use(express.json());
app.use('/api/genres',genres);
app.use('/',home);
const port = process.env.PORT || 3000;
app.listen(port, () =>{
console.log(`Listening on port ${port}...`);
});