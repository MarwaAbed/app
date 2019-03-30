import {Meteor} from 'meteor/meteor'
export const data=data1;
if(Meteor.isServer){
var redis=require('redis');
var client=redis.createClient();
client.on('connect',function(){
  //console.log('connected marwa');
});

var data1=[];
client.keys('*',function(err,keys){
  if(err)return console.log(err);
  for(i=0;i<keys.length;i++){
    console.log(keys[i]);
    client.get(keys[i],function(err,reply){
      data1.push(reply);
    });
  }
});
console.log(data1);
}
