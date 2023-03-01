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
    // comparison query operators
    //eq(equals)
    //ne(not equals)
    //gt(greater than)
    //gte(greater than or equals to)
    //lt(less than)
    //lte(less than or equals to)
    //in(within certain values)
    //nin(not in)

    const courses=await Course
    // .find({author:'Markus',isPublished:true})
    // .find({price:{$gt:10,$lt:20}})
    // .find({price:{$in:[10,15,20]}})
    .limit(2)
    .sort({name:-1})
    .select({name:1,tags:1});
    console.log(courses);
}
getCourses();
