'use strict';

// Dependencies
const http = require('http');
const RC = require('ringcentral');

// RingCentral JS SDK Variables
let appKey = process.env.APP_KEY;
let appSecret = process.env.APP_SECRET;
let usename = process.env.USErNAME;
let password = process.env.PASSWORD;
let extension = process.env.EXTENSION;
let toNumber = process.env.TO_NUMBER;
let fromNumber = process.env.FROM_NUMBER;
let message = process.env.SMS_MESSAGE;

// Instantiate RingCentral JS SDK
let rcsdk = new RC({
    server: RingCentral.SDK.server.sandbox,
    appKey: appKey,
    appSecret: appSecret
    //redirectUri: '' // optional
});

// Get the RingCentral Platform Object
let platform = rc.platform();

//Login with Password Flow
rcsdk.platform()
    .login({
        username: password, // phone number in full format
        extension: extension, // leave blank if direct number is used
        password: password
    })
    .then(function(response) {
        // your code here
    })
    .catch(function(e) {
        alert(e.message  || 'Server cannot authorize user');
    });

let sendSMS(e, to, from, body) => {
    rcsdk.platform()
        .post('/account/~/extension/~/sms', {
            from: {phoneNumber:'+' + from}, // Your sms-enabled phone number
            to: [
                {phoneNumber:'+' + to} // Second party's phone number
            ],
            text: body
        })
        .then(function(response) {
            console.log(response);
            alert('Success: ' + response.json().id);
        })
        .catch(function(e) {
            console.error(e);
            alert('Error: ' + e.message);
        });
};

// Platform Event Handlers
platform.on(platform.events.loginSuccess, function(e){
    // Send an SMS
    sendSMS(null, toNumber, fromNumber, message);
});
