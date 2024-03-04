
exports.getIndexPage = (req, res) => {
    console.log(req.session.userID )
    res.render('index',{
        pageName:"index"
    });
}

exports.getAboutPage = (req,res) =>{
    res.render('about',{
        pageName:"about"
    })
}

exports.getRegisterPage = (req,res) => {
    res.render('register',{
        pageName:'register'
    })
}
exports.getLoginPage = (req,res)=>{
    res.render('login',{
        pageName:'login'
    })
}