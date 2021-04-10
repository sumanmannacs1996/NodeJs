const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { Binary } = require('bson');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a possitive number");
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:7,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error("'password' shuld not contain in password");       
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    abatar:{
        type:Buffer
    }
},{
    timestamps:true
})
 
//adding vartual relation of task
userSchema.virtual('tasks_try',{
    ref:"Task",
    localField:'_id',
    foreignField:'owner'
})

//removing sensative data wile sending response
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}


//authenticate using email and password
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user)
        throw new Error({error:"User Not found!"});
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
        throw new Error({error:"Unable to Login :("});
    return user;        
}

//Generating JWS Token
userSchema.methods.generateToken = async function (){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save(); 
    return token;
}

//Hash the plain text password before saving
userSchema.pre('save',async function (next){
    const user = this
    if(user.isModified('password'))
        user.password= await bcrypt.hash(user.password,8);
    next();
})

//Delete all the tasks by the user before deleting the user
userSchema.pre('remove', async function(next){
    const Tasks= require("../models/task");
    const user =this;
    await Tasks.deleteMany({owner:user._id});
    next();
})

const User = mongoose.model('User',userSchema);

module.exports= User;