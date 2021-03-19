const https = require('https');


const address = process.argv[2];
const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFubmFzdW1hbjQxIiwiYSI6ImNrbWR2NWFjbzF1eG4ydnBoZTQzMGppOHAifQ.68hWlieorcXgr1qgckJP9A&limit=1`

const request = https.request(url,(response)=>{
    let data ='';
    response.on('data',(chunks)=>{
        data = data + chunks.toString();
    });

    response.on("end",()=>{
        const Jsonbody = JSON.stringify(data);
        const objBody = JSON.parse(Jsonbody);
        console.log(objBody);
    })
});

request.on('error',(error)=>{
    console.log(error);
});

request.end();