"use strict";

const MongoClient = require('mongodb').MongoClient;
const {MONGO_URL} = require("./constants");

module.exports.handler = async ()=>{
  const client = await MongoClient.connect(MONGO_URL, {useUnifiedTopology: true});
  const dbo = client.db('haikuJam');
  // return Promise.try(()=>{
  //   return dbo.createCollection("haiku").then(res=>{
  //     console.log('succ');
  //     return true;
  //   })
  //   .then(() => {
      
  //     var myobj = { 
  //       name: "test123", 
  //       tag: "Inpiring", 
  //       line1 : {
  //         lineText : "1",
  //         createdBy : "user1_id",
  //         createdAt : Date.now()
  //       }, 
  //       line2 : {
  //         lineText : "2",
  //         createdBy : "user2_id",
  //         createdAt : Date.now()
  //       },
  //       line3 : {
  //         lineText : "3", 
  //         createdAt : Date.now(),
  //         createdBy : "user3_id"
  //       }
  //     };
      
  //     var myobj1 = { 
  //       name: "test1", 
  //       tag: "Childish", 
  //       line1 : {
  //         lineText : "3",
  //         createdBy : "user2_id",
  //         createdAt : Date.now()
  //       }, 
  //       line2 : {
  //         lineText : "2",
  //         createdBy : "user1_id",
  //         createdAt : Date.now()
  //       }
  //     };
  //     return dbo.collection("haiku").insertMany([myobj, myobj1]);
  //   // })
  // })
  // .then(()=> 
  return dbo.stats((err, res)=>{
    if(err){
      console.log(err);
      return;
    }  
    console.log(res);
    // return rs.status()
    return dbo.executeDbAdminCommand( { replSetGetStatus: 1 },(err, res)=>{
      
      if(err){
        console.log(err);
        return client.close();
      }
      console.log('res',res);
      return client.close();
    })
  });//.catch(err=>console.log(err));

}
