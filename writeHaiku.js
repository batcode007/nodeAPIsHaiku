"use strict";

// const MongoClient = require('mongodb').MongoClient;
const {MONGO_URL} = require("./constants");
const mongo = require('mongodb');

module.exports.handler = async (event={}, context, cb) => {

    const lineNumber = event.lineNumber;
    const lineText = event.lineText;
    const userId = event.userId;
    const haikuId = event.haikuId;
    const haikuName = event.haikuName;
    const haikuTag = event.haikuTag;

    if(!lineNumber || !lineText || !userId || !haikuName || !haikuTag){
        throw new Error("Missing one or more parameters");
    }

    //find user and authenticate user. check is user has privilege to write

    /*
        return UserModel.getUser(userId).then(user => {
            if(checkPrivilege(user)){
                return user;
            }
            else{
                throw new Error("User doesnt have privilege to write on haiku");
            }
        })
    */
    const MongoClient = mongo.MongoClient;
    const client = await MongoClient.connect(MONGO_URL, {useUnifiedTopology: true});
    const dbo = client.db("haikuJam");
    
    if(!haikuId && lineNumber==1){
        const haikuToInsert = { 
            name: haikuName, 
            tag: haikuTag, 
            line1 : {
              lineText : lineText,
              createdBy : userId,
              createdAt : Date.now()
            }
          };
          
        return dbo.collection("haiku").insertOne(haikuToInsert, ()=>client.close());
         
    }
    else{
        const haikuObj = {};
        haikuObj[`line${lineNumber}`] = {
                lineText : lineText,
                createdBy : userId,
                createdAt : Date.now()
            }
        const o_id = new mongo.ObjectID(haikuId);
        return dbo.collection("haiku").updateOne({_id : o_id}, {$set : haikuObj}, ()=>{
            return client.close();
        });
    }
    // .catch(err=>console.log(err));
    // })
    // .catch(err=>console.log(err));    
}

// handler();