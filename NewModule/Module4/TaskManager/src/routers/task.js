const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
require('../db/mongoose');

const auth = require('../middleware/auth');

/*
router.post('/tasks',(req,res)=>{
    console.log(req.body);
    const task = new Task(req.body);
    task.save().then(()=>{
        res.send(task);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})
*/
// using async await
router.post('/tasks',auth, async(req,res)=>{
    const task = new Task({
        ...req.body,
        owner:req.user._id
    });
    
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
})


/*
router.get('/tasks',(req,res)=>{
    Task.find().then((tasks)=>{
        if(!tasks)
            return res.status(404).send({error:"No data found!"});
        res.send(tasks);
    }).catch((e)=>{
        res.status(500).send(e);
    })
});
*/
//using async await
router.get('/tasks',auth, async(req,res)=>{
    const match={};
    const sort={};
    if(req.query.compleated){
        match.compleated = req.query.compleated === 'true'
    }
    if(req.query.sortBy){
        let value = req.query.sortBy.split(":");
        sort[value[0]]= value[1]=='desc' ? -1 :1;
    }
    try{
        //const tasks = await Task.find({owner:req.user._id);
        await req.user.populate({
            path:'tasks_try',
            match:match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort:sort
            }
        }).execPopulate();
        if(!req.user.tasks_try)
            res.status(404).send({error:"No data found!"});
        res.status(200).send(req.user.tasks_try);    
    }catch(e){
        res.status(500).send(e);
    }
})
/*
router.get('/task/:id',(req,res)=>{
    const _id =req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task)
            return res.status(404).send({error:"No data found!"});
        res.send(task);    
    }).catch((e)=>{
        res.status(500).send(e);
    })
})
*/
//Using async and await
router.get('/task/:id',auth, async(req,res)=>{
    const _id = req.params.id;
    try{
        //const task = await Task.findById(_id);
        const task = await Task.findOne({_id,owner:req.user._id})
        if(!task)
            res.status(404).send({error:"No data found!"});
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(e);
    }
})



router.patch('/task/:id',auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdates=['description','compleated'];
    const isValidOperation = updates.every((p)=>allowUpdates.includes(p));
    if(!isValidOperation)
        res.status(400).send({error:"Invalid updates!"});
    try{
        //const task = await Task.findById(req.params.id);
        let task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task)
            return res.status(404).send({error:"No data found!"});
        updates.forEach((p)=>task[p] = req.body[p]);
        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.send(task);    
    }catch(e){
        res.status(500).send(e);
    }
})



router.delete('/task/:id',auth, async (req,res)=>{
    try{
        //const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
            if(!task)
                res.status(404).send({error:"No data found!"});
            res.send(task);    
    }catch(e){
        res.status(500).send(e);
    }
})




module.exports= router;