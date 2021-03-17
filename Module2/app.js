const express = require('express');
const adminData = require('./routers/admin');

const path = require('path');

const app = express();

const shopRouts = require('./routers/shop');
const bodyParser = require('body-parser');

const expressHbs = require('express-handlebars');

app.engine('hbs',expressHbs());
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'Public')));

app.use('/admin',adminData.routes);
app.use(shopRouts);

app.use((req,res,next)=>{
  //res.status(404).sendFile(path.join(__dirname,'views',"404.html"));
  res.status(404).render('404',{pageTitle:'Page Not Found'});
})



app.listen(3000);
