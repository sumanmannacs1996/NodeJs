const chalk = require('chalk');
const foreCast =require('./foreCast.js');
const geoCode = require('./geoCode.js');

const location = process.argv[2];
if(location != undefined){

geoCode(location,(error,response)=>{
    if(error){
        console.log(chalk.red.inverse(error));
    }
    else{
        const location = response.location;
        foreCast(response.latitude,response.longitude,(error,response)=>{
            if(error){
                console.log(chalk.red.inverse(error));
            }
            else{
                console.log(chalk.green.inverse(`Its Currently ${response.temperature} degrees humidity is ${response.humidity} and weather descriptions is ${response.weatherDescriptions} in ${location} at time ${response.time}`));
            }
        }) 
    }

});

}
else{
    console.log(chalk.red.inverse("Please provide a location name in Comand line argument"));
}



