const request = require('request');

const geoCode=(address,callback)=>{
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFubmFzdW1hbjQxIiwiYSI6ImNrbWR2NWFjbzF1eG4ydnBoZTQzMGppOHAifQ.68hWlieorcXgr1qgckJP9A&limit=1`;
    request({url:geocodeURL, json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to Geo location service!",undefined);
        }
        else if(response.body.message){
            callback(response.body.message,undefined);
        }
        else{
            const geoData ={
                longitude:response.body.features[0].geometry.coordinates[0],
                latitude:response.body.features[0].geometry.coordinates[1],
                location:response.body.features[0].place_name
                
            }
            callback(undefined,geoData);
        }
    })
};


module.exports=geoCode;