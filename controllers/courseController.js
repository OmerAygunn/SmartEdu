const Course = require('../models/Course')
const Category = require('../models/Category')

exports.createCourses = async (req,res) => {
    try{
        const course = await Course.create(req.body)
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
        const course = await Course.findOne({ slug: req.params.slug }); // "slug" alanına göre arama yapılmalı
        if (!course) {
            console.error('Course not found.');
            return res.status(404).render('course-single', {
                course,
                pageName: 'courses'
            });
        }
        res.status(200).render('course-single', {
            course,
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

