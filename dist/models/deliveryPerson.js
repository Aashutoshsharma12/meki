"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, default: '' },
    addBy: { type: String, default: 'Admin' },
    image: { type: String, default: '' },
    phoneNumber: { type: String },
    countryCode: { type: String },
    phone_verify: { type: Boolean, default: false },
    language: { type: String, default: 'en' },
    notificationStatus: { type: Boolean, default: true },
    lat: { type: String },
    long: { type: String },
    status: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const deliveryPersonModel = (0, mongoose_1.model)('deliveryPersons', schema);
module.exports = deliveryPersonModel;
