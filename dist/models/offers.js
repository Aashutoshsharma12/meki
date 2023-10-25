"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    offer_token: { type: String },
    name: { type: String, default: '' },
    lower_name: { type: String, default: '' },
    meso_name: { type: String, default: '' },
    meso_lower_name: { type: String, default: '' },
    description: { type: String, default: '' },
    meso_description: { type: String, default: '' },
    min_order_amount: { type: Number, default: 0 },
    max_offer_amount: { type: Number, default: 0 },
    offer_per: { type: Number, default: 0 },
    start_date: { type: String },
    end_data: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const offerModel = (0, mongoose_1.model)('offer', schema);
module.exports = offerModel;
