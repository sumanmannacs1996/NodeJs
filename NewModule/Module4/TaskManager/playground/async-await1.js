require('../src/db/mongoose');
const Task = require('../src/models/task');

const deleteByIdAndCount = async (Id)=>{
    const task = await Task.findByIdAndDelete(Id);
    const count = await Task.countDocuments({compleated:true});
    return count;
}

deleteByIdAndCount("606cb97e435c22772494d974").then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})