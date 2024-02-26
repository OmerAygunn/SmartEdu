const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Specify the root directory for serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index',{
        pageName:"index"
    });
});
app.get('/about',(req,res) =>{
    res.render('about',{
        pageName:"about"
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Our Port is ${port}`);
});
