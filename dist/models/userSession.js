"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    deviceType: { type: String },
    deviceIp: { type: String },
    timezone: { type: String },
    language: { type: String, default: "en" },
    currentVersion: { type: String, default: '1.0.1' },
    deviceToken: { type: String },
    role: { type: String },
    isActive: { type: Boolean, default: true },
    jwtToken: { type: String },
    userId: { type: String },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});
const userSessionModel = (0, mongoose_1.model)('userSessions', schema);
module.exports = userSessionModel;
