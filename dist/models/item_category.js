"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    lower_name: { type: String },
    meso_name: { type: String, required: true },
    addBy: { type: String, default: 'Vendor' },
    meso_lower_name: { type: String },
    description: { type: String },
    meso_description: { type: String },
    image: { type: String },
    position: { type: String },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});
const item_categoryModel = (0, mongoose_1.model)('item_category', schema);
module.exports = item_categoryModel;
