"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    itemId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'item' },
    name: { type: String, default: '' },
    lower_name: { type: String, default: '' },
    addBy: { type: String, default: 'Vendor' },
    meso_name: { type: String, default: '' },
    meso_lower_name: { type: String, default: '' },
    price: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const menu_sizeModel = (0, mongoose_1.model)('menu_size', schema);
module.exports = menu_sizeModel;
