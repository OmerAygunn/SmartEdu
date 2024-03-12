const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
var methodOverride = require('method-override')
const pageRoutes =  require('./routes/pageRoutes')
const courseRoutes =  require('./routes/courseRoute')
const categoryRoutes = require('./routes/categoryRoutes')
const authRoutes = require('./routes/authRoute')
const Course = require('./models/Course')

const app = express();
app.set('view engine', 'ejs');

// Gloabal Variables 
global.userIN = null;


// MİDDLEWARES

app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/SmartEdu-db'})
  }))
  app.use('*',(req,res,next)=>{
    userIN = req.session.userID
    next();
  })

  app.use(flash());

  app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
   })
  app.use(
    methodOverride('_method',{
      methods:["GET","POST"]
    })
    ) 
 

app.use('/',pageRoutes)
app.use('/courses',courseRoutes)
app.use('/categories',categoryRoutes)
app.use('/users',authRoutes)




const port = 3000;
app.listen(port, () => {
    console.log(`Our Port is ${port}`);
});


