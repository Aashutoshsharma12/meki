"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    reason: { type: String, default: '' },
    addBy: { type: String, default: 'Admin' },
    lower_reason: { type: String, default: '' },
    meso_reason: { type: String, default: '' },
    meso_lower_reason: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const cancelReasonModel = (0, mongoose_1.model)('cancelReason', schema);
module.exports = cancelReasonModel;
