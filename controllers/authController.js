const User = require('../models/User')
const bcrypt = require('bcrypt')
const session = require('express-session');
const Category = require('../models/Category');
const Course = require('../models/Course');


exports.createUser = async (req, res) => {
    try {
        
        const user = User.create(req.body)
        res.status(201).render('login',{
            status: 'success',
            user,
            pageName:'login'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }); 
    if (!user) 
    { 
        res.status(400).send("kullanici yok"); 
     } 
    const same = await bcrypt.compare(password, user.password); 
    if (same) { 
        req.session.userID = user._id
        res.redirect('/users/dashboard') 
    }
    else{
        res.status(400).send("Password is wrong")
    }
  };
exports.logoutUser = async (req,res) => {
   req.session.destroy(()=>{
    res.redirect('/')
   })
}

exports.dashboardPage = async(req,res) =>{
    const user = await User.findOne({_id:req.session.userID}).populate('courses')
    const category = await Category.find()
    const courses = await Course.find({user:req.session.userID})
    res.render('dashboard',{
        pageName:'dashboard',
        user,
        category,
        courses
    })
}


  
