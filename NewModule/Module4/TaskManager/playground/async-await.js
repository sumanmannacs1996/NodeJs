require('../src/db/mongoose');
const User = require('../src/models/user');

const updateAgeAndCount= async (Id,Age)=>{
    const user = await User.findByIdAndUpdate(Id,{age:Age});
    const count = await User.countDocuments({age:Age});
    return count;
}

updateAgeAndCount("606bc9019d9b012e706b5edd",25).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})