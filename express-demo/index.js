const Joi=require('joi');
const express=require('express');
const app=express();
const logger=require('./middleware/logger');
const auth = require('./middleware/auth');
const helmet=require('helmet');
const morgan=require('morgan');
const config=require('config');
const courses=require('./routes/courses');
const home=require('./routes/home');
// const dot=require('dotenv').config({NODE_ENV:process.env.NODE_ENV});
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
//setting view engine
app.set('view engine','pug');
// app.set('views','./views'); // this is default setting we can change the location by overriding it
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
app.use('/api/courses',courses);//using the router
app.use('/',home);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
if(app.get('env')==='development'){
    app.use(morgan('tiny')); //gives details about the requests made
    console.log("Morgan Enabled....");
    // startupDebugger("Morgan Enabled....");
}
console.log("Application name : "+config.get('name'));
console.log("Mail Server : "+config.get('mail.host'));
// console.log("Password : "+config.get('mail.password'));



const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));