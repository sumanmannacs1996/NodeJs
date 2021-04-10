const express = require('express');
const path= require('path');
const hbs = require('hbs');
//const bodyParser = require('body-parser');
const geoCode = require('./utills/geoCode');
const foreCast = require("./utills/foreCast");

const app = express();

//app.use(bodyParser.urlencoded({extended:false}));

const publicDirectryPath = path.join(__dirname,"../public");
const templatesDirectoryPath = path.join(__dirname,"../templates/views");
const partialsDirectoryPath = path.join(__dirname,"../templates/partials");
app.set('view engine','hbs');
app.set('views',templatesDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectryPath));

app.get('',(req,res)=>{
   // else{
        const location =req.query.address;
        geoCode(location,(error,response)=>{
            if(error){
               return res.send(error);
            }
            else{
                const location = response.location;
                foreCast(response.latitude,response.longitude,(error,response)=>{
                    if(error){
                        return res.send(error);
                    }
                    else{
                        res.send((`Its Currently ${response.temperature} degrees humidity is ${response.humidity} and weather descriptions is ${response.weatherDescriptions} in ${location} at time ${response.time}`));
                    }
                }) 
            }
        
        }); 
 //   }

})

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Use this to get your weather",
        headerData:"Weather from Header partials",
        footerData:"This is footer from Weather page"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about",
        data:"This is About page",
        headerData:"about from Header partials",
        footerData:"This is footer from About page"
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        data:"This is Help page",
        headerData:"Help from Header partials",
        footerData:"This is footer from Help page"
    })
})


app.get("/friend",(req,res)=>{
    const data = [{name:"Suman Manna",place:'West Bengal'},{name:"Suchet Talikota",place:'Maharastra'},{name:"Megha Kumari",place:'Bihar'}];
    res.send(data);
});

app.get("*",(req,res)=>{
    res.render("404",{
        title:404,
        error:"Page not available"
    })
})

app.listen(3000);