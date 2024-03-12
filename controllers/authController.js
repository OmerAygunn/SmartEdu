const User = require('../models/User')
const bcrypt = require('bcrypt')
const session = require('express-session');
const Category = require('../models/Category');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');


exports.createUser = async (req, res) => {
    try {
    

        const user = await User.create(req.body);
        res.status(201).render('login', {
            status: 'success',
            user,
            pageName: 'login'
        });

    } catch (error) {
        const errors = validationResult(req) 
        errors.array().forEach(element => {
            req.flash('error', `${element.msg}`);
        });   
        //const msg = errors.array()[0].msg
        res.status(400).redirect('/register')
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }); 
   if(user){

       const same = await bcrypt.compare(password, user.password); 
       if (same) { 
           req.session.userID = user._id
           res.redirect('/users/dashboard') 
       }
       else{
           req.flash('error',"Password is wrong")
           res.status(400).redirect('/login')
       }
   }
   if (!user) 
   { 
       req.flash('error',"User not exist")
       res.status(400).redirect('/login'); 
    } 
  };
exports.logoutUser = async (req,res) => {
   req.session.destroy(()=>{
    res.redirect('/')
   })
}

exports.dashboardPage = async(req,res) =>{
    const allUser = await User.find();
    const user = await User.findOne({_id:req.session.userID}).populate('courses')
    const category = await Category.find()
    const courses = await Course.find({user:req.session.userID})
    res.render('dashboard',{
        pageName:'dashboard',
        user,
        category,
        courses,
        allUser
    })
}

exports.deleteUser = async(req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        await Course.deleteMany({user:req.params.id})
        res.redirect('/users/dashboard')
           
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}




  
