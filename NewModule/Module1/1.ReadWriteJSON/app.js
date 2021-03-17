const fs = require('fs');

const person ={
    Name:"Suman Manna",
    Gender:"M",
    Age:25,
};

const personJSON = JSON.stringify(person);  //convert JS object to JSON data

fs.writeFileSync("Data.json",personJSON);  //save the JSON data to a file

const dataBuffer = fs.readFileSync('Data.json');  //read the data from a file (data type is buffer)
console.log(dataBuffer);

const dataJSON = dataBuffer.toString(); //conver the buffer data to JSON

const data = JSON.parse(dataJSON);  //conver the JSON data to JS object

for([key,value] of Object.entries(data)){
    console.log(`${key} : ${value}`);
}








