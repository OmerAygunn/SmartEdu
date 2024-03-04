const mongoose = require('mongoose');
const slugify  = require('slugify');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/SmartEdu-db')


const CourseSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
   // image:Buffer,
    creadetAt:{
        type:Date,
        default:Date.now()
    },
    slug:{
        type:String,
        unique:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
})
CourseSchema.pre('validate',function(next){
    this.slug = slugify(this.name,{
        lower:true,
        strict:true
    })
    next();
})


const Course = mongoose.model('Course',CourseSchema)

module.exports = Course
