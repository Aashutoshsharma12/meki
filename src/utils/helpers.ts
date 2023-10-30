import { topics } from '@constants';
import axios from 'axios';
import moment from 'moment-timezone';
var admin = require("firebase-admin");
var serviceAccount = require("../../src/adminsdk.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const cert = admin.credential.cert(serviceAccount)

function identityGenerator(count: number, padding: string) {
    var c = count + 1;
    var str = "" + c;
    var pad = "0000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    var m = new Date();
    var mm = m.getMonth() + 1;
    var yy = m.getFullYear();
    var dd = m.getDate();
    var theID = (padding + "" + yy + "" + mm + "" + dd + "" + ans);
    return theID
}

function getEpochAfterNMinutes(n: any) {
    if (n == 0) {
        return Math.round(moment.utc().valueOf() / 1000)
    } else {
        const time: any = moment.utc().add(n, 'minutes')
        return Math.round(time / 1000)
    }
}

function randomString(length: number, chars: string) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('~') > -1) mask += '~!@*&$';
    var result = '';

    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result.toString();
}

function numberFormatter(num: any, digits = 1) {
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
        return num.toFixed(digits)
}


function subscribeTo_topic(device_token: any, topics: any) {
    const registrationToken = device_token; // The token of the device you want to subscribe.
    topics.forEach((topic: any) => {
        admin.messaging().subscribeToTopic(registrationToken, topic)
            .then(() => {
                console.log(`Subscribed ${registrationToken} to topic: ${topic}`);
            })
            .catch((error: any) => {
                console.error(`Error subscribing: ${error}`);
            });
    });
}
function unSubscribeTo_topic(device_token: any, topic: any) {
    const registrationToken = device_token; // The token of the device you want to subscribe.
    admin.messaging().subscribeToTopic(registrationToken, topic)
        .then(() => {
            console.log(`Subscribed ${registrationToken} to topic: ${topic}`);
        })
        .catch((error: any) => {
            console.error(`Error subscribing: ${error}`);
        });
}
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
    const payload: any = {
        notification: {
            title: "hii",
            body: "bye"
        }
    }
    const token = "dztWikXsQrCPFFwC3p1rL8:APA91bEv2nEr-v88WGDWZC9Rl_8USFkt9TGMVXadhI0b2IAGjWGbTAiSimAwyQrsmR72oYCD0lcmAIyD5NyJa6Mp5XrEw1m2gpn7I_V_EJRznw4JVQXAr7QyqFo7FEGtlMPUhb0_PmJR"
    admin.messaging().sendToDevice(token, payload).then((result: any) => {
        console.log(result, "result")
    }).catch((err: any) => {
        console.log(err, "err")
    })
    //multidevice token
    // payload.tokens = token,
    // admin.messaging().sendMulticast(payload).then((result: any) => {
    //     console.log(result, "result")
    // }).catch((err: any) => {
    //     console.log(err, "err")
    // })
}
//sendBulkNotification using subscribeToTopic
function sendBulkNotification(data: any, topic: any) {
    if (topic == 'All') {
        var topics1: any = topics.All
    }
    if (topic == 'All Customers') {
        var topics1: any = topics['All Customers']
    }
    if (topic == 'All Business Owners') {
        var topics1: any = topics['All Business Owners']
    }
    if (topic == 'All Delivery Persons') {
        var topics1: any = topics['All Delivery Persons']
    }
    if (topic == 'All Customers & Business Owners') {
        var topics1: any = topics['All Customers & Business Owners']
    }
    if (topic == 'All Customers & Delivery Persons') {
        var topics1: any = topics['All Customers & Delivery Persons']
    }
    if (topic == 'All Delivery Persons & Business Owners') {
        var topics1: any = topics['All Delivery Persons & Business Owners']
    }

    const payload: any = {
        notification: {
            title: "hii",
            body: "bye"
        },
        topic: topics1
    }
    admin.messaging().send(payload).then((result: any) => {
        console.log(result, "result")
    }).catch((err: any) => {
        console.log(err, "err")
    });
}

export {
    identityGenerator,
    getEpochAfterNMinutes,
    randomString,
    numberFormatter,
    subscribeTo_topic,
    unSubscribeTo_topic,
    sendSingleNotification,
    sendBulkNotification
}
