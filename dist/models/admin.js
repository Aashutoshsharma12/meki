"use strict";
const mongoose_1 = require("mongoose");
const _ = require('underscore');
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    token: { type: String },
    role: { type: String, default: "Admin" },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});
const adminModel = (0, mongoose_1.model)('Admin', schema);
module.exports = adminModel;
