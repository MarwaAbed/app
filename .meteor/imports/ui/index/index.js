import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Mongo} from 'meteor/mongo';
import {dumydata} from '../../api/collections/dumydata.js'
import {data} from '../../api/collections/redis'
import './index.html';

var redis=require('redis');
var client=redis.createClient();
client.on('connect',function(){
  //console.log('connected marwa');
});
Template.index.onCreated(function () {

});
Template.index.helpers({
  dumyData(){
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm11111111111111111111111111mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    client.keys('*',function(err,keys){
      if(err)return console.log(err);
      for(i=0;i<keys.length;i++){
        console.log(keys[i]);
        client.get(keys[i],function(err,reply){
          console.log(reply);
        });
      }
    });

  return   [];//data;
}


});
