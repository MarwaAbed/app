import {Meteor} from 'meteor/meteor';

var redis = require('redis');
var client = redis.createClient(6379, 'ec2-54-188-126-145.us-west-2.compute.amazonaws.com', {no_ready_check: true});


client.on('connect', function() {
    console.log('Connected to Redis');
});

client.setSync=Meteor.wrapAsync(client.set);
client.hmgetSync=Meteor.wrapAsync(client.hmget);
client.hmsetSync=Meteor.wrapAsync(client.hmset);
client.hkeysSync=Meteor.wrapAsync(client.hkeys);
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
  const ids=client.keysSync("patient*");
  if(!ids || ids.length<=0)
  {
    const fields=["name","dateOfBirth","sensorID","email"];

    for(i=0;i<10;i++)
    {
      client.hmsetSync('patient'+i, {
          'name': 'patient'+i,
          'dateOfBirth': new Date().toLocaleString(),
          'sensorID': 'heartbeat'+i,
          "email":"patient"+i+"@shc.com"
      });
    }
  }
     Meteor.methods({

       getRedisArrayByKey:function(table,fields){
         console.log("server called by client");

         const data=client.hmgetSync(table,fields)

         return data;

       },
       getTableIds:function(tableName){
         const ids=client.keysSync(tableName+'*');
         return ids;
       },
       getAllTabledata:function(tableName,fields){
         const ids=client.keysSync(tableName+'*');
         const tableData=[];
         for(i=0;i<ids.length;i++){
           data={};
           values=client.hmgetSync(ids[i],fields);
           for(j=0;j<values.length;j++){
             data[fields[j]]=values[j];
           }
           tableData.push(data);
         }
         return tableData;
       },
       getLatestBySensorID:function(sensorId){
         const timeStamps=client.hkeysSync(sensorId)
         //console.log(timeStamps);
         item={
           time:timeStamps[timeStamps.length-1],
           read:client.hmgetSync(sensorId,timeStamps[timeStamps.length-1])[0]
         }
         console.log(item);
         return item;
       },
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

       },
       setReidsArrayData:function(table,fields){
         //client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
         client.hmsetSync(table,fields);
       },

       setRedisData:function(key,value){
         console.log("server called by client: set redis",key,value);
         client.setSync(key,value);

       },
     })
});
