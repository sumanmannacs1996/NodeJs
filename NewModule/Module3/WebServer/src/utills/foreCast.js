const request = require('request');

const weatherUpdate =(latitude,longitude,callback)=>{
    const weatherUrl =`http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    request({url:weatherUrl, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }
        else if(response.body.error){
            callback(response.body.error.info,undefined);
        }
        else{
           const weatherData={
                temperature:response.body.current.temperature,
                weatherDescriptions:response.body.current.weather_descriptions[0],
                time:response.body.current.observation_time,
                humidity:response.body.current.humidity
            };
            callback(undefined,weatherData);
        }
    })
}


module.exports = weatherUpdate;