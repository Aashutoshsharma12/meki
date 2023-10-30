"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    sunday: {
        open: { type: String },
        close: { type: String },
        status: { type: Boolean, default: true }
    },
    monday: {
        open: { type: String },
        close: { type: String },
        status: { type: Boolean, default: true }
    },
    tuesday: {
        open: { type: String },
        close: { type: String },
        status: { type: Boolean, default: true }
    },
    wednesday: {
        open: { type: String },
        close: { type: String },
        status: { type: Boolean, default: true }
    },
    thursday: {
        open: { type: String },
        close: { type: String },
        status: { type: Boolean, default: true }
    },
    friday: {
        open: { type: String },
        close: { type: String },
        status: { type: Boolean, default: true }
    },
    saturday: {
        open: { type: String },
        close: { type: String },
        status: { type: Boolean, default: true }
    },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const open_closingModel = (0, mongoose_1.model)('open_closing', schema);
module.exports = open_closingModel;
