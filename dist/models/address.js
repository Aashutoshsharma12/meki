"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true },
    addressLine1: { type: String },
    addressLine2: { type: String },
    addressLine3: { type: String },
    lat: { type: String, required: true },
    long: { type: String, required: true },
    landmark: { type: String },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const addressModel = (0, mongoose_1.model)('address', schema);
module.exports = addressModel;
