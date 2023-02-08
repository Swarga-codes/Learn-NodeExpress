function authenticate(req,res,next){
    console.log("Authenticating...");
    next(); // if we dont include next then the app keeps hanging
}
module.exports = authenticate;