const btn = document.getElementById('myLocation');
const myLocation = document.getElementById("myLocationData");

const obj ={
    latitude:0,
    longitude:0
}

const getData=()=>{
    return obj;
}


btn.addEventListener('click',(event)=>{
    console.log("working");
    navigator.geolocation.getCurrentPosition(data=>{
        setTimeout(()=>{
            //myLocation.innerHTML=`latitude= ${data.coords.latitude} and longitude = ${data.coords.longitude}`;
            const weatherUrl =`http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=${encodeURIComponent(data.coords.latitude)},${encodeURIComponent(data.coords.longitude)}`;
            const xhr = new XMLHttpRequest();
            xhr.open('GET',weatherUrl);
            xhr.send();
            xhr.onload=()=>{
                const weatheData = JSON.parse(xhr.response);
                const weatherOBJ={
                    temperature:weatheData.current.temperature,
                    weatherDescriptions:weatheData.current.weather_descriptions[0],
                    time:weatheData.current.observation_time,
                    humidity:weatheData.current.humidity,
                    location:weatheData.location.country+" "+weatheData.location.region+" "+weatheData.location.name 
                };
                myLocation.innerHTML=(`Its Currently ${weatherOBJ.temperature} degrees humidity is ${weatherOBJ.humidity} and weather descriptions is ${weatherOBJ.weatherDescriptions} in ${weatherOBJ.location} at time ${weatherOBJ.time}`);
            }
           // myLocation.innerHTML=`latitude= ${data.coords.latitude} and longitude = ${data.coords.longitude}` 
        },5000);
    },error=>{
        console.log(error);
    })
});


const weatherUpdate =(latitude,longitude,callback)=>{
    const weatherUrl =`http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET',weatherUrl);
    xhr.send();
    xhr.onload=()=>{
        const weatheData = JSON.parse(xhr.response);
        console.log(weatheData);
    }
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