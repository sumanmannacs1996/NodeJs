const fs = require('fs');

const requestHandler =(req,res)=>{
    const url = req.url;
if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method ="POST"><input type ="text" name="message" ><button type ="submit">Send</button></input></form></body>');
    res.write('</html>');
    return res.end();
}
if(url === '/message' && req.method ==='POST'){
    let body=[];
    req.on('data',(chunks)=>{
        console.log(chunks);
        body.push(chunks);
    });
    console.log(body);
    req.on('end',()=>{
        let parseData = Buffer.concat(body).toString();
        let message = parseData.split("=")[1];
        fs.writeFileSync("Message.txt",message,error=>{
            res.statusCode=302; ///302 for redirection
        res.setHeader('Location','/');
        return res.end();
        });
    });
}
res.setHeader('Content-Type',"text/html");
res.write('<html>');
res.write('<head><title>Enter Message</title></head>');
res.write('<body><h1>Hello from node.js Server</h1></body>');
res.write('</html>');
res.end();
};

module.exports = {
    handler:requestHandler,
    otherData: "Some Random data"
}
