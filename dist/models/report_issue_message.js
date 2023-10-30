"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report_issue_messageModel = void 0;
const mongoose_1 = require("mongoose");
;
const schema = new mongoose_1.Schema({
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
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.report_issue_messageModel = (0, mongoose_1.model)('report_issue_messages', schema);
