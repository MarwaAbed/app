//global.Buffer=global.Buffer || require("buffer").Buffer;
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Mongo} from 'meteor/mongo';
import {dumydata} from '../../api/collections/dumydata.js'
import {data} from '../../api/collections/redis'
import './index.html';

/*redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function() {
 console.log("Error in Redis client");
})
*/
Template.index.onCreated(function () {
      const instance=this;
      instance.state=new ReactiveDict();
      Meteor.call('getRedisData',function(err,res){
        if(err){
          console.log(err);
        }
        else {
          //console.log(res)
          this.state.set("data",res);
        }
      }.bind(instance));
});
Template.index.helpers({
  dumyData(){
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm11111111111111111111111111mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  /*  redisClient.keys('*',function(err,keys){
      if(err)return console.log(err);
      for(i=0;i<keys.length;i++){
        console.log(keys[i]);
        redisClient.get(keys[i],function(err,reply){
          console.log(reply);
        });
      }
    });*/
          return Template.instance().state.get("data");


},
dumydataCount(){
  return Template.instance().state.get("data").length;
}


});
