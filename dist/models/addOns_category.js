"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    itemId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'items' },
    name: { type: String, required: true },
    lower_name: { type: String },
    quantity: { type: Number },
    addBy: { type: String, default: "Vendor" },
    addOns_count: { type: Number },
    meso_name: { type: String, required: true },
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
const addOns_categoryModel = (0, mongoose_1.model)('addOns_category', schema);
module.exports = addOns_categoryModel;
