"use strict";
const mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    roomId: { type: String },
    message: { type: String },
    messageType: { type: String, default: 'text' },
    readStatus: {
        type: Boolean,
        default: false
    },
    sendFrom: {
        type: String,
        default: 'user'
    },
    sendTo: {
        type: String,
        default: 'delivery_boy'
    },
    date: {
        type: Date,
        default: new Date()
    },
    timestamp: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
});
const messageModel = (0, mongoose_1.model)('Message', messageSchema);
module.exports = messageModel;
