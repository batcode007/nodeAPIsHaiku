"use strict";

const db = require("./db");
const getHaiku = require("./getHaiku");
const writeHaiku = require("./writeHaiku");

// const testEvent1 = {
//     haikuId : 
// };

const writeHaikuEvent = {
    lineNumber : 1,
    lineText : 'this is again first line',
    userId : 'user2_id',
    haikuName : 'haikuNew',
    haikuTag : 'Interesting',
};

const main = () =>{

    //set up and start mongo instance
    return db.handler();

    //get incomplete haiku from db
    // return getHaiku.handler().catch(err=>console.log(err));
    
    // writeHaiku.handler(writeHaikuEvent).catch(err=>console.log(err));
    
    // return;
};

main();