const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const databaseUrl ='mongodb://127.0.0.1:27017';
const databaseName = 'TASK_MANAGER';

MongoClient.connect(databaseUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);
    ///INSERT---------------------------------------------------
   /* //to insert single record start
    db.collection('users').insertOne({
        name:"Suman Manna",
        age:25
    },
    (error,result)=>{
        if(error){
            return console.log("Unable to insert users");
        }
        console.log(result.ops);
    }) */

  /*  //to insert multiple record
    db.collection('users').insertMany([
        {
            name:"Pritom Sarkar",
            age:25
        },
        {
            name:"Megha Kumari",
            age:25
        },
        {
            name:"Shaibal Mayti",
            age:25
        }
    ],(error,result)=>{
        if(error){
            return console.log("Unable to insert users");
        }
        console.log(result.ops);
    }) */
    //FETCH------------------------------------------------------------------------------
    /*
    //fetch single record
    db.collection('users').findOne({name:'Suman Manna'},(error,result)=>{
        console.log(`fetch single record->`);
        console.log(result);
    });
    //fetch single record using _id
    db.collection('users').findOne({_id: new mongodb.ObjectId("605d85372abb556988d0b15d")},(error,result)=>{
        console.log(`fetch single record using _id->`);
        console.log(result);
    });
    //fetch multiple record in array form
    db.collection("users").find({age:25}).toArray((error,result)=>{
        console.log(`fetch multiple record in array form->`);
        console.log(result);
    });
    //fetch the count of record
    db.collection('users').find({age:25}).count((error,count)=>{
        console.log(`fetch the count of record->`);
        console.log(count);
    });
    */
    //UPDATE-----------------------------------------------------------------------
    /*
    //update single record 
    db.collection('users').updateOne({
        _id: new mongodb.ObjectId("605d85372abb556988d0b15d")
    },{
        $set:{
            name:'Murly'
        }
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
    //increment all age by 2 whose age 25
    db.collection('users').updateMany({
        age:25
    },{
        $inc:{
            age:2
        }
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
    */
    //DELETE--------------------------------------------------------
    //Delete single record
    db.collection('users').deleteOne({
        name:'Pritom Sarkar'
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
    //Delete Multiple record 
    db.collection('users').deleteMany({
        age:27
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
})