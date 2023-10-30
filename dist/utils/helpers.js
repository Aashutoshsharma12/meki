"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBulkNotification = exports.sendSingleNotification = exports.unSubscribeTo_topic = exports.subscribeTo_topic = exports.numberFormatter = exports.randomString = exports.getEpochAfterNMinutes = exports.identityGenerator = void 0;
const _constants_1 = require("../constants/index");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
var admin = require("firebase-admin");
var serviceAccount = require("../../src/adminsdk.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const cert = admin.credential.cert(serviceAccount);
function identityGenerator(count, padding) {
    var c = count + 1;
    var str = "" + c;
    var pad = "0000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    var m = new Date();
    var mm = m.getMonth() + 1;
    var yy = m.getFullYear();
    var dd = m.getDate();
    var theID = (padding + "" + yy + "" + mm + "" + dd + "" + ans);
    return theID;
}
exports.identityGenerator = identityGenerator;
function getEpochAfterNMinutes(n) {
    if (n == 0) {
        return Math.round(moment_timezone_1.default.utc().valueOf() / 1000);
    }
    else {
        const time = moment_timezone_1.default.utc().add(n, 'minutes');
        return Math.round(time / 1000);
    }
}
exports.getEpochAfterNMinutes = getEpochAfterNMinutes;
function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1)
        mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1)
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1)
        mask += '0123456789';
    if (chars.indexOf('~') > -1)
        mask += '~!@*&$';
    var result = '';
    for (var i = length; i > 0; --i)
        result += mask[Math.floor(Math.random() * mask.length)];
    return result.toString();
}
exports.randomString = randomString;
function numberFormatter(num, digits = 1) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    if (num > 1)
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    else
        return num.toFixed(digits);
}
exports.numberFormatter = numberFormatter;
function subscribeTo_topic(device_token, topics) {
    const registrationToken = device_token; // The token of the device you want to subscribe.
    topics.forEach((topic) => {
        admin.messaging().subscribeToTopic(registrationToken, topic)
            .then(() => {
            console.log(`Subscribed ${registrationToken} to topic: ${topic}`);
        })
            .catch((error) => {
            console.error(`Error subscribing: ${error}`);
        });
    });
}
exports.subscribeTo_topic = subscribeTo_topic;
function unSubscribeTo_topic(device_token, topic) {
    const registrationToken = device_token; // The token of the device you want to subscribe.
    admin.messaging().subscribeToTopic(registrationToken, topic)
        .then(() => {
        console.log(`Subscribed ${registrationToken} to topic: ${topic}`);
    })
        .catch((error) => {
        console.error(`Error subscribing: ${error}`);
    });
}
exports.unSubscribeTo_topic = unSubscribeTo_topic;
// var FCM = require('fcm-node');
// var serverKey = 'BLygNgtAOoBzNAhsxzC9FBC6xBbhYaFYslJEHlREk81iRRQhphvdjm0nQ0c8sqisAiTcrdJuUJ4lYP4toZRYTfQ'
// var fcm = new FCM(serverKey);
// var message: any = {
//     to: ["dztWikXsQrCPFFwC3p1rL8:APA91bEv2nEr-v88WGDWZC9Rl_8USFkt9TGMVXadhI0b2IAGjWGbTAiSimAwyQrsmR72oYCD0lcmAIyD5NyJa6Mp5XrEw1m2gpn7I_V_EJRznw4JVQXAr7QyqFo7FEGtlMPUhb0_PmJR"],
//     notification: {
//         title: "hii",
//         body: "bye"
//     }
// }
// fcm.send(message, function (err: any, response: any) {
//     if (err) {
//         console.log("Something has gone wrong in sending push!", err);
//     } else {
//         console.log("Successfully sent with response: ", response);
//     }
// });
function sendSingleNotification() {
    const payload = {
        notification: {
            title: "hii",
            body: "bye"
        }
    };
    const token = "dztWikXsQrCPFFwC3p1rL8:APA91bEv2nEr-v88WGDWZC9Rl_8USFkt9TGMVXadhI0b2IAGjWGbTAiSimAwyQrsmR72oYCD0lcmAIyD5NyJa6Mp5XrEw1m2gpn7I_V_EJRznw4JVQXAr7QyqFo7FEGtlMPUhb0_PmJR";
    admin.messaging().sendToDevice(token, payload).then((result) => {
        console.log(result, "result");
    }).catch((err) => {
        console.log(err, "err");
    });
    //multidevice token
    // payload.tokens = token,
    // admin.messaging().sendMulticast(payload).then((result: any) => {
    //     console.log(result, "result")
    // }).catch((err: any) => {
    //     console.log(err, "err")
    // })
}
exports.sendSingleNotification = sendSingleNotification;
//sendBulkNotification using subscribeToTopic
function sendBulkNotification(data, topic) {
    if (topic == 'All') {
        var topics1 = _constants_1.topics.All;
    }
    if (topic == 'All Customers') {
        var topics1 = _constants_1.topics['All Customers'];
    }
    if (topic == 'All Business Owners') {
        var topics1 = _constants_1.topics['All Business Owners'];
    }
    if (topic == 'All Delivery Persons') {
        var topics1 = _constants_1.topics['All Delivery Persons'];
    }
    if (topic == 'All Customers & Business Owners') {
        var topics1 = _constants_1.topics['All Customers & Business Owners'];
    }
    if (topic == 'All Customers & Delivery Persons') {
        var topics1 = _constants_1.topics['All Customers & Delivery Persons'];
    }
    if (topic == 'All Delivery Persons & Business Owners') {
        var topics1 = _constants_1.topics['All Delivery Persons & Business Owners'];
    }
    const payload = {
        notification: {
            title: "hii",
            body: "bye"
        },
        topic: topics1
    };
    admin.messaging().send(payload).then((result) => {
        console.log(result, "result");
    }).catch((err) => {
        console.log(err, "err");
    });
}
exports.sendBulkNotification = sendBulkNotification;
