require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('606bc9019d9b012e706b5edd',{age:26}).then((user)=>{
    console.log(user);
    return User.countDocuments({age:26})
}).then((user1)=>{
    console.log(user1);
}).catch((e)=>{
    console.log(e);
})