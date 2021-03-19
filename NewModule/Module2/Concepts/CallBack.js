let sum =(a,b,callback)=>{
    setTimeout(()=>{
        callback(a+b); 
    },2000);
}

sum(3,5,(data)=>{
    console.log(data);
});

let geocode =(adress,callback)=>{
    setTimeout(()=>{
        const data ={
            Lattitude:3,
            Longitude:5
        }
        callback(data);
    },2002);
}

geocode("dhfdshfg",(data)=>{
    console.log(data);
})