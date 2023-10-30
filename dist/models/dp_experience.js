"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, default: '' },
    lower_title: { type: String, default: '' },
    meso_title: { type: String, default: '' },
    lower_meso_title: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const dpExpMessageModel = (0, mongoose_1.model)('dpExpMessage', schema);
module.exports = dpExpMessageModel;
