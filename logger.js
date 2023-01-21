const EventEmitter=require('events');
// const emitter=new EventEmitter();
var url="http://mylogger.io/log";
class Logger extends EventEmitter{
log(message){
    console.log(message);
this.emit('messageLogged',{id:1, url: "https://www.google.com"});
}
}
console.log(__dirname);
console.log(__filename);
// module.exports.log=log;
module.exports=Logger;