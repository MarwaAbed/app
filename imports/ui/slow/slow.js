//global.Buffer=global.Buffer || require("buffer").Buffer;
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Mongo} from 'meteor/mongo';
import {dumydata} from '../../api/collections/dumydata.js'
import {data} from '../../api/collections/redis'
import './slow.html';

/*redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function() {
 console.log("Error in Redis client");
})
*/
Template.slow.onCreated(function () {
      const instance=this;
      instance.state=new ReactiveDict();
      console.log("slow");

});
Template.slow.helpers({
  dumyData(){
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm11111111111111111111111111mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
      return dumydata.find();


},
dumydataCount(){
  return dumydata.find().count();
}


});
