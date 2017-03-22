'use strict';

// Dependencies
require('dotenv').config(); // If using this in multi-environment (local and deployed versions) might want to add logic for checking NODE_ENV environment variable to load only if local
const http = require('http');
const winston = require('winston');
const RingCentral = require('ringcentral');

// Set log level
winston.level = process.env.LOG_LEVEL;

// RingCentral JS SDK Variables
let myAppKey = process.env.APP_KEY;
let myAppSecret = process.env.APP_SECRET;
let myUsername = process.env.USErNAME;
let myPassword = process.env.PASSWORD;
let myExtension = process.env.EXTENSION;
let myToNumber = process.env.TO_NUMBER;
let myFromNumber = process.env.FROM_NUMBER;
let mySmsBody = process.env.SMS_MESSAGE;

// Instantiate RingCentral JS SDK
let rcsdk = new RingCentral({
    server: RingCentral.server.sandbox,
    appKey: myAppKey,
    appSecret: myAppSecret
});

// Get the RingCentral Platform Object
let platform = rcsdk.platform();

let hasPermission = () => {
    return platform()
        .get('/account/~/extension/~/authz-profile/check?permissionId=OutboundSMS')
        .then((response) => {
            winston.log('verbose', 'Check Permission Response', response.json());
            if(response.json().successful) {
                winston.log('verbose', 'Authenticated user has OutboundSMS permission');
                return true;
            } else {
                winston.log('error', 'Authenticated user missing OutboundSMS permission');
                throw new Error('Authenticated user missing OutboundSMS permission');
            }
        })
        .catch((e) => {
            winston.log('error', 'Error checking RingCentral permission', e);
            throw e;
        });
};

let invalidateFromPhoneNumber = (fromNumber) => {
    return platform()
        .get('/account/~/extension/~/phone-number')
        .then((response) => {
            let phoneNumberList = response.json();
            winston.log('verbose', 'Extension Phone Number List Response', phoneNumberList);
            if(phoneNumberList.records) {
                let matchingNumberObj = phoneNumberList.records.find((obj) => {
                    return obj.phoneNumber.includes(fromNumber);
                });
                if(matchingNumberObj && -1 !== matchingNumberObj.features.indexOf('SmsSender')) {
                    return true;
                } else {
                    return false;
                }
            }
        })
        .catch((e) => {
            winston.log('error', 'Error checking RingCentral permission', e);
            throw e;
        });
};

let sendSMS = (fromNumber, toNumber, smsBody) => {
    return platform()
        .post('/account/~/extension/~/sms', {
            from: {phoneNumber:'+' + fromNumber}, // Your sms-enabled phone number
            to: [
                {phoneNumber:'+' + toNumber} // Second party's phone number
            ],
            text: smsBody
        })
        .then((response) => {
            winston.log('verbose', 'Created SMS successfully, need to check delivery status in Message API', response.json());
            winston.log('info', 'SMS id', response.json().id);
            return response.json();
        })
        .catch((e) => {
            winston.log('error', 'Error creating SMS', e);
            throw e;
        });
};

//Login with Password Flow
platform
    .login({
        username: myUsername, // phone number in full format
        extension: myExtension, // leave blank if direct number is used
        password: myPassword
    })
    .then((response) => {
        // your code here
        winston.log('info', 'Authenticated to RingCentral!', response.json());
    })
    .then(hasPermission)
    .then((hasPermissionResult) => {
        invalidateFromPhoneNumber(myFromNumber);
    })
    .then((isValidFromNumber) => {
        sendSMS(myFromNumber, myToNumber, mySmsBody);
    })
    .catch((e) => {
        winston.log('error', 'Authentication to RingCentral failed', e);
        throw e;
    });

// Platform Event Handlers
platform.on(platform.events.loginSuccess, function(e){
    winston.log('verbose', 'Successfully authenticated to RingCentral', {
        timestamp: +new Date(),
        response: e
    });
});

platform.on(platform.events.loginError, function(e){
    winston.log('error', 'Failed to login to RingCentral', {
        timestamp: +new Date(),
        response: e
    });
});

platform.on(platform.events.logoutSuccess, function(e){
    winston.log('verbose', 'Successfully authenticated to RingCentral', {
        timestamp: +new Date(),
        response: e
    });
});

platform.on(platform.events.logoutError, function(e){
    winston.log('error', 'Failed to logout to RingCentral', {
        timestamp: +new Date(),
        response: e
    });
});

platform.on(platform.events.refreshSuccess, function(e){
    winston.log('verbose', 'Successfully refreshed the access_token for RingCentral', {
        timestamp: +new Date(),
        response: e
    });
});

platform.on(platform.events.refreshError, function(e){
    winston.log('verbose', 'Failed to refresh the access_token for RingCentral', {
        timestamp: +new Date(),
        response: e
    });
});
