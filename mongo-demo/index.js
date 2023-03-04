const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to mongo db...'))
.catch(err=>console.error('Couldnt connect to mongo db',err))

//creating a schema
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean,
});
//compiling the schema into a model
const Course = mongoose.model('Course',courseSchema);
//creating a new data
async function createCourse(){
const course=new Course({
    name:'React Development',
    author: 'Markus',
    tags: ['frontend','react'],
    isPublished:true
});
const result=await course.save();
console.log(result);
}
// createCourse();
//reading the data or querying the data
async function getCourses(){
    const pageNumber=2;
    const pageSize=10;
    //The above is used for pagination mostly it is implemented from the query strings in api
    // comparison query operators
    //eq(equals)
    //ne(not equals)
    //gt(greater than)
    //gte(greater than or equals to)
    //lt(less than)
    //lte(less than or equals to)
    //in(within certain values)
    //nin(not in)
//logical query operators
//and (similar to or)
//or({name:'Mosh'},{isPublished:true})
//Regular expressions
// Starts with markus
// .find({author:/^Markus/})
//ends with markus
    // .find({name:/Markus$/})
    //has markus in between
// .find({name:/.*Markus.*/})
//doesnt check for case or we can say is case insensitive
// .find({author:/^Markus/i})
    const courses=await Course
    // .find({price:{$gt:10,$lt:20}})
    // .find({price:{$in:[10,15,20]}})
    // .find({author:'Markus',isPublished:true})
    // .find()
    // .or([{author:'Markus'}, {isPublished:true}])
    // .and([{author:'Markus'},{isPublished:true}])
    .find({author:/^Markus/i})
    // .find({name:/Markus$/})
// .find({name:/.*Markus.*/})
    // .limit(2)
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    .sort({name:-1})
    .select({name:1,tags:1})
    .count();
    console.log(courses);
}
getCourses();
