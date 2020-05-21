"use strict";

const MongoClient = require('mongodb').MongoClient;
const {MONGO_URL} = require("./constants");

module.exports.handler = async (event, context, cb) => {

    const client = await MongoClient.connect(MONGO_URL, {useUnifiedTopology: true});
    const dbo = client.db("haikuJam");
    return dbo.collection("haiku").find({line3 : {$exists : false}}).toArray((err, res)=>{
        //handle error
       console.log(res);
        return client.close();
    });
    // .catch(err=>console.log(err));
    // })
    // .catch(err=>console.log(err));    
}

// handler();