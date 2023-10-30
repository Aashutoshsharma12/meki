"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lower_name: { type: String },
    meso_name: { type: String },
    meso_lower_name: { type: String },
    description: { type: String },
    meso_description: { type: String },
    image: { type: String },
    click: { type: Boolean },
    position: { type: Number },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});
const exploreModel = (0, mongoose_1.model)('explore', schema);
module.exports = exploreModel;
