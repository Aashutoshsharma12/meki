"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId },
    deliveryPersonId: { type: mongoose_1.Schema.Types.ObjectId },
    status: { type: String, default: 'Open' },
    message: { type: String },
    addBy: { type: String },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});
const supportModel = (0, mongoose_1.model)('support', schema);
module.exports = supportModel;
