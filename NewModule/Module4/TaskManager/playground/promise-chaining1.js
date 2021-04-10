require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete("606bcf6ae3422a29382c1a56").then((task)=>{
    console.log(task);
    return Task.countDocuments({compleated:false});
}).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})