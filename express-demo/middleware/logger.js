function log(req,res,next){
    console.log("Logging...");
    next(); // if we dont include next then the app keeps hanging
}
module.exports = log;