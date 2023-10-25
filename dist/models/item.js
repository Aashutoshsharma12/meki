"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    catId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'item_category' },
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: '' },
    lower_name: { type: String, default: '' },
    meso_name: { type: String, default: '' },
    meso_lower_name: { type: String, default: '' },
    menu_size_price: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    addBy: { type: String, default: 'Vendor' },
    menuType: { type: String, default: '' },
    time: { type: String, default: '' },
    description: { type: String, default: '' },
    available: { type: Boolean, default: true },
    meso_description: { type: String, default: '' },
    quantity: { type: Number, default: 1 },
    addOn_count: { type: Number, default: 0 },
    menuSize_count: { type: Number, default: 0 },
    addOn_Cat_count: { type: Number, default: 0 },
    image: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const itemModel = (0, mongoose_1.model)('item', schema);
module.exports = itemModel;
