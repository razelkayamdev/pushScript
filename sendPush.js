//
//  Created by Raz Elkayam on 06/22/15.
//

var apn = require(__dirname + '/node_modules/' + 'apn'); // https://github.com/argon/node-apn // npm install apn

var options = {'production' : false,
                'cert' : __dirname + '/cert.pem',
                'key' : __dirname  + '/key.pem'
};

var service = new apn.Connection(options);

service.on("connected", function() {
           console.log("Connected to APNS");
});

service.on("transmitted", function(notification, device) {
           console.log("Notification transmitted to:" + device.token.toString("hex"));
           process.exit();
});

service.on("transmissionError", function(errCode, notification, device) {
           console.error("Notification caused error: " + errCode + " for device ", device, notification);
           if (errCode === 8) {
           console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
           }
           process.exit();
});

service.on("timeout", function () {
           console.log("Connection Timeout");
           process.exit();
});

service.on("disconnected", function() {
           console.log("Disconnected from APNS");
           process.exit();
});

var device = new apn.Device('aedab4c0d434fe8e4d5add74d05439b28f047dd1b249b03efe3d7741bad68611');

var note = new apn.Notification();
note.badge = 1;
note.sound = "default";
note.alert = {'title' : 'Shoping List' , 'body' : 'you need to buy some milk!'}; // can also be a string, i.e. note.alert = 'some text on the push';

service.pushNotification(note, device);
