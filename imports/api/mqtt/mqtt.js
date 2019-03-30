// var mqtt = require('mqtt')
// var client  = mqtt.connect('mqtt://m13.cloudmqtt.com',{username:"keboguhb",password:"IuCSOZxO2N4E",port:19873,keepalive: 1000})
//
// client.on('connect', function () {
//   console.log("connected to mqtt")
//
//   //client.publish('presence', 'Hello mqtt')
// })
// setTimeout(function(){
//  client.subscribe('python/test', { qos: 2 });
// }, 3000);
// client.on('error', function (err) {
//   console.log("err to mqtt",err)
//   //client.subscribe('python/test', { qos: 2 })
//   //client.publish('presence', 'Hello mqtt')
// })
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log("message from brocker",message.toString())
//   client.end()
// })

// var client  = mqtt.connect('mqtt://test.mosquitto.org')
//
// client.on('connect', function () {
//   console.log("connected to mqtt")
//   client.subscribe('presence')
//   client.publish('presence', 'Hello mqtt')
// })
//
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// })
var mqtt = require('mqtt');

var settings = {
     clientId: "shc",
    username:"keboguhb",
    password:"IuCSOZxO2N4E",
    port:19873,
    keepalive: 0,
    clean: false,
    reconnectPeriod: 1000 * 1
}

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://m13.cloudmqtt.com', settings);

client.on('connect', function () {
  client.subscribe('user/heart_beat2', { qos: 1 });
    console.log('connected to the server. ID :', "mqtt://m13.cloudmqtt.com");
});

client.on('message', Meteor.bindEnvironment(function (topic, message) {
  var fields = message.toString().split("#");
  Meteor.call("setReidsArrayData","heart_beat2",fields,function (err, res) {
      console.log("table data ", err, res)
  });
  console.log(message.toString());
}));

client.on("error", function(error) {
    console.log("ERROR: ", error);
});

client.on('offline', function() {
    console.log("offline");
});

client.on('reconnect', function() {
    console.log("reconnect");
    client.subscribe('user/heart_beat2', { qos: 1 });
});

// setTimeout(function(){
//    client.subscribe('python/test', { qos: 1 });
// }, 3000)

//start sending
// var i = 0;
// setInterval(
//     function(){
//         var message = i.toString();
//         console.log("sending ", message)
//         client.publish("test", message, {qos: 1}, function(){
//             console.log("sent ", message)
//         });
//         i += 1;
//     },
// 3000)
