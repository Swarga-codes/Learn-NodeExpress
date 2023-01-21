// function hello(name){
//     console.log("My name is: ",name);
// }
// hello('Markus');
// console.log(window);
// var sayHello='';
// console.log(global.sayHello);
// console.log(module);
//jshint app.js helps us in finding the errors
// const logger=require('./logger');
// logger.log('Hello World!!');
//Path Module
const path=require('path');
let pathObj =  path.parse(__filename);
console.log(pathObj);
//OS Module
const os=require('os');
let totalMemory=os.totalmem();
let freeMemory=os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
//FS Module
const fs=require('fs');
const files=fs.readdirSync('./');
console.log(files);
fs.readdir('./', function(err,res){
if(err) console.log("Error: ",err);
else console.log("Result: ",res);
});
//Event Emitter
const EventEmitter = require('events');
// const emitter = new EventEmitter();
//here we can also use emitter.addListener which serves the same purpose

//Raise an event 
// emitter.emit('messageLogged',{id:1, url: "https://www.google.com"});
const Logger = require('./logger');
const logger = new Logger();
//Register a listener
logger.on('messageLogged',(arg) => {
    console.log("Event emitted sucessfully!",arg);
});
logger.log('message');

