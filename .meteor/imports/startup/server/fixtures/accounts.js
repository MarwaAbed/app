import {Meteor} from 'meteor/meteor';
import fs from 'fs';
import {dumydata} from "../../../api/collections/dumydata";
//import {client} from "../../both/default";


import path from 'path';
var redis=require('redis');
var client=redis.createClient();
client.on('connect',function(){
  //console.log('connected marwa');
});
Meteor.startup(() => {


    // PATIENTS
    if (dumydata.find().count() === 0) {
        for (i = 0; i < 3; i++) {
          const dumydataname="dumydata"+i;
            //console.log("create data:", Patients.insert({name:dumydataname}));
            dumydata.insert({name:dumydataname});
            client.set('marwa'+i,'AngularJS'+i,function(err,reply){
             console.log(reply);
            });
        }

        console.log("after 100000");
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
        });
    //  }
        console.log("after readingggggg");
    }

});
