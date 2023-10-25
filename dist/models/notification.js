"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String },
    meso_tittle: { type: String },
    description: { type: String },
    meso_description: { type: String },
    sendTo: { type: String },
    sendFrom: { type: String },
    sendDate: { type: String },
    sendTime: { type: String },
    status: { type: Boolean },
    isDelete: { type: Boolean, default: false }
});
const notificationModel = (0, mongoose_1.model)('notification', schema);
module.exports = notificationModel;
