const User = require('../models/User')
const bcrypt = require('bcrypt')
const session = require('express-session')


exports.createUser = async (req, res) => {
    try {
        
        const user = User.create(req.body)
        // res.status(201).json({
        //     status: 'success',
        //     user
        // });
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
        res.redirect('/') 
    }
  };
exports.logoutUser = async (req,res) => {
   req.session.destroy(()=>{
    res.redirect('/')
   })
}

exports.dashboardPage = async(req,res) =>{
    const user = await User.findOne({_id:req.session.userID})
    res.render('dashboard',{
        pageName:'dashboard',
        user
    })
}


  
