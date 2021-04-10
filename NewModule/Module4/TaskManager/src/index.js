const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');



const app = express();
const port = process.env.PORT;
/*
to disable all the services
app.use((req,res,next)=>{
    res.status(503).send("Site is currently down. Check back soon!");
})
*/
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
/*
//testing bcrypt
const bcrypt = require('bcrypt');
const myFunction = async()=>{
    const passwod = "Suman@121!";
    const hashedPassword = await bcrypt.hash(passwod,8);
    console.log(passwod);
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare("Suman@121!",hashedPassword);
    const isMatch1 = await bcrypt.compare("suman@121!",hashedPassword);
    console.log(isMatch,isMatch1);
}
myFunction(); */

/*
//Json Web Token
const jwt = require('jsonwebtoken');
const myjewFunction = async ()=>{
    const token = jwt.sign({_id:"abcd1234"},"ThisIsMySecrecMessage",{expiresIn:"1 days"});
    console.log(token);
    const data = jwt.verify(token,'ThisIsMySecrecMessage');
    console.log(data);
}
myjewFunction(); */
/*
//fetch user information from task
const Task = require('./models/task');
const func1 = async()=>{
    const task = await Task.findById("606f24d3b0f1235ba0064993");
    await task.populate('owner').execPopulate();
    console.log(task.owner);
}
//func1();
//fetch all the task of the user bt the user id
const User = require('./models/user');
const func2 = async ()=>{
    const user =await User.findById('606f23cffae627222ce301c7');
    await user.populate('tasks_try').execPopulate();
    console.log(user.tasks_try);
}
func2();
*/
/*
//uploard file using multer
const multer = require('multer');
const upload = multer({
    dest:'images'
})
app.post('/upload',upload.single('uploadData'),(req,res)=>{
    res.send();
}) */
app.listen(port,()=>{
    console.log("server is up and running on port "+port);
})