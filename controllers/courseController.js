const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')

exports.createCourses = async (req,res) => {
    try{
        const course = await Course.create({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            user:req.session.userID
        })
        res.status(201).redirect('/courses')
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            error
        })
    }
} 

exports.getAllCourses = async (req,res) =>{
 
   try{ 
    const categorySlug = req.query.categories;
    const category = await Category.findOne({slug:categorySlug})

    let filter = {};
    if(categorySlug) {
      filter = {category:category._id}
    }
    const courses = await Course.find(filter).sort({ creadetAt: -1 });
    const categories = await Category.find()
    res.status(200).render('courses',{
        courses,
        categories,
        pageName:'courses'
    }) 

    


    

       
   }
   catch(error){
    res.status(400).json({
        status:'fail',
        error
    })
   }

}

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');
        const category = await Category.findById(course.category); // Kursun kategorisine göre kategori al
        const user = await User.findById(req.session.userID)
        if (!course) {
            console.error('Course not found.');
            return res.status(404).render('course-single', {
                course,
                category,
                user,
                pageName: 'courses'
            });
        }
        res.status(200).render('course-single', {
            course,
            category,
            pageName: 'courses'
        });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while fetching the course.'
        });
    }
}

exports.enrollCourse = async (req,res) => {
    try{
        const user = await User.findById(req.session.userID)
        user.courses.addToSet({_id:req.body.course_id})
        await user.save()
        res.redirect('/users/dashboard')
    }catch(error){
        res.status(401).json({
            status:'fail',
            error
        })
    }
}
exports.relaseCourse = async(req,res) =>{
  try{
    const user = await User.findById(req.session.userID)
    user.courses.pull({_id:req.body.course_id})
    user.save()
    res.redirect('/users/dashboard')
}
catch(eroor){
    res.status(400).json({
        status:'fail',
        eroor
    })
}

}

