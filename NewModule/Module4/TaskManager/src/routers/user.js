const express = require('express');
const router = new express.Router();
const User = require('../models/user');
require('../db/mongoose');

const auth = require('../middleware/auth');

const multer = require('multer');
const sharp = require('sharp');

const {sendWelcomeMail,sendCancilationMail} = require('../emails/userMail');
/*
router.post('/user',(req,res)=>{
    console.log(req.body);
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})
*/
//using asyng await
router.post('/user', async (req,res)=>{
    console.log(req.body);
    const user = new User(req.body);
    try{
        await user.save();
        sendWelcomeMail(user.email,user.name);
        const token = await user.generateToken(); 
        res.status(201).send({user,token});
    }catch(e){
        res.status(400).send(e);
    }
})

/*
router.get('/users',(req,res)=>{
    User.find().then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send(e);
    })
});
*/
//using async await
router.get('/admin/users', async(req,res)=>{
    try{
        const users = await User.find();
        if(!users)
            res.status(404).send({error:"No data found!"});
        res.status(200).send(users);    
    }catch(e){
        res.status(500).send(e);
    }
})

/*
router.get('/user/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user)
            return res.status(404).send({error:"No data found!"});
        res.send(user);    
    }).catch((e)=>{
        res.status(500).send(e);
    })
});
*/
//using async await
router.get('/user/:id', async(req,res)=>{
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        if(!user)
            res.status(404).send({error:"No data found!"});
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e);
    }
})
//update profile by id
router.patch('/user/:id', async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdates = ['name','age','password','email'];
    const isValidOperation = updates.every((p)=>allowUpdates.includes(p));

    if(!isValidOperation)
        return res.status(400).send({error:"Invalid updates!"});

    try{
        const user = await User.findById(req.params.id);
        if(!user)
           return res.status(404).send({error:"No data found!"});
        updates.forEach((p)=>user[p] = req.body[p]);
        await user.save();
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.send(user);    
    }catch(e){
        res.status(500).send(e);
    }
})

router.patch('/users/me',auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdates = ['name','age','password','email'];
    const isValidOperation = updates.every((p)=>allowUpdates.includes(p));
    
    if(!isValidOperation)
        return res.status(400).send({error:"Invalid updates!"});

    try{
        
        updates.forEach((p)=>req.user[p] = req.body[p]);
        await req.user.save();
        res.send(req.user);    
    }catch(e){
        res.status(500).send(e);
    }
})

//delete By id
/*
router.delete('/user/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
            if(!user)
                res.status(404).send({error:"No data found!"});
            res.send(user);    
    }catch(e){
        res.status(500).send(e);
    }
})
*/
router.delete('/users/me',auth, async (req,res)=>{
    try{
        await req.user.remove();
        res.send(req.user);    
    }catch(e){
        res.status(500).send(e);
    }
})


router.post('/user/login', async (req,res)=>{
    try{
        //custom function defined in user module
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateToken();
            res.send({user,token});
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/users/me',auth,async(req,res)=>{
    try{
        res.send(req.user);
    }catch(e){
        res.send(e);
    }
})

router.post('/user/logout',auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((p)=>p.token!=req.currentToken);
        await req.user.save();
        res.send({"data":"Logout Successfully !!"});
    }catch(e){
        res.status(500).send(e);
    }
})

router.post('/user/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens =[];
        await req.user.save();
        res.send({"data":"Logout Successfully Frm All Devices !!"});
    }catch(e){
        res.status(500).send(e);
    }
})

//upload profile pic
const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
       //if(!file.originalname.match(/\.(doc|docx|pdf|jpg|png)$/)){ 
        if(!file.originalname.endsWith('.jpg')){
            return cb(new Error("Please upload a jpg image"));
        }
        cb(undefined,true);
    }
})
router.post('/user/me/abatar',auth,upload.single('avtarData'),async (req,res)=>{
    const dataLowReulation =  await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    req.user.abatar = dataLowReulation;
    await req.user.save();
    res.send();
},(error,req,res,next)=>{
    res.status(400).send({error:error.message});
})

//delete abatar
router.delete('/user/me/abatar',auth, async (req,res)=>{
    try{
    req.user.abatar = undefined;
    await req.user.save();
    sendCancilationMail(req.user.email,req.user.name);
    res.send();
    }catch(e){
        res.status(500).send(e);
    }
})

//get avatar by user id

router.get('/user/abatar/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.abatar)
             throw new Error("No data found");
        res.set('Content-Type','image/jpg') 
        res.send(user.abatar);    

    }catch(e){
        res.send(e);
    }
})

module.exports=router;