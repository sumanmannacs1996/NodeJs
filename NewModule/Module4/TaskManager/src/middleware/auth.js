const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decodedId = await jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({_id:decodedId._id, 'tokens.token':token});

        if(!user)
            throw new Error();
       req.currentToken =token; 
       req.user = user;
        next();
    }catch(e){
        res.status(401).send({error:"Please Authenticate!"});
    }
};

module.exports = auth;