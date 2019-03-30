Push.debug=true;
Push.Configure({
    apn: {
      //certData: Assets.getText('apnDevCert.pem'),
      //keyData: Assets.getText('apnDevKey.pem'),
      passphrase: 'xxxxxxxxx',
      production: true,
      gateway: "https://smarthc-7d53d.firebaseio.com",//'gateway.push.apple.com',
    },
    gcm: {
      apiKey: 'AIzaSyAYgLJpM59SjiOzXYQIE_eKzYsgjQk7C2Q',
      projectNumber: 146249834221
    }
    // production: true,
    // 'sound' true,
    // 'badge' true,
    // 'alert' true,
    // 'vibrate' true,
    // 'sendInterval': 15000, Configurable interval between sending
    // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    // 'keepNotifications': false,
  //
  });
  Push.allow({
      send:(userId,notification)=>{
          return true;
      }
  });

  Meteor.methods({
      'serverNotification'(title,text){
          Push.send({
              title,
              text,
              from:'server',
              badge:1,
              query:{}
          });
      }
  });