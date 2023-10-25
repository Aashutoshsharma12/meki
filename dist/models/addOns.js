"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    addOns_CatId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'addOns_category' },
    itemId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'item' },
    name: { type: String, default: '' },
    addBy: { type: String, default: 'Vendor' },
    lower_name: { type: String, default: '' },
    meso_name: { type: String, default: '' },
    meso_lower_name: { type: String, default: '' },
    price: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const addOnsModel = (0, mongoose_1.model)('addOns', schema);
module.exports = addOnsModel;
