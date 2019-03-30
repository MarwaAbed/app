import {Meteor} from 'meteor/meteor';
import fs from 'fs';
import {dumydata} from "../../../api/collections/dumydata";
//import {client} from "../../both/default";


import path from 'path';
var redis = require('redis');
var client = redis.createClient(13239, 'redis-13239.c8.us-east-1-4.ec2.cloud.redislabs.com', {no_ready_check: true});
client.auth('MarWael', function (err) {
    if (err) throw err;
});

client.on('connect', function() {
    console.log('Connected to Redis');
});
// var client = redis.createClient({host:"redis-13239.c8.us-east-1-4.ec2.cloud.redislabs.com",port:13239});
//var client = redis.createClient({host : 'localhost', port : 6380});
// client.auth("<YOUR_PASSWORD>");
client.setSync=Meteor.wrapAsync(client.set);
client.getSync=Meteor.wrapAsync(client.get);
client.keysSync=Meteor.wrapAsync(client.keys);
client.on('ready',function() {
 console.log("Redis is ready");
});

client.on('error',function(err) {
 console.log("Error in Redis server");
 console.log(err);
})
Meteor.startup(() => {


     Meteor.methods({

       getRedisData:function(){
         console.log("server called by client");
         const keys=client.keysSync('*');
         const data=[];
         for(var i=0;i<keys.length;i++)
         {
           item={
             _id:keys[i],
             name:client.getSync(keys[i])
           }
            data.push(item)

          }
         return data;

       }
     })


    // PATIENTS
    //if (dumydata.find().count() ==0) {
        for (i = 0; i < 10; i++) {
          const dumydataname="dumydata"+i;
            //console.log("create data:", Patients.insert({name:dumydataname}));
          //  dumydata.insert({name:dumydataname});
            client.setSync(i,dumydataname);
            //client.setSync('marwa'+i,'AngularJS'+i,function(err,reply){
            // console.log(reply);
            //});
        }
      /*  const dumy=dumydata.find();
        console.log(dumy.count());
        dumy.forEach(function(item){

        })*/

      /*  console.log("after 100000");
        console.log("created 100000 dumy data");
        //  for (i = 0; i < 3; i++) {
        client.keys('*',function(err,keys){
          if(err)return console.log(err);
          for(i=0;i<keys.length;i++){
            console.log(keys[i]);
            client.get(keys[i],function(err,reply){
              console.log(reply);
            });
          }
        });*/
    //  }
      //  console.log("after readingggggg");
    //}

});
