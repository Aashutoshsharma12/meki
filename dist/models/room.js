"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    roomId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'orders' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    deliveryPId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'deliveryPersons' },
    creatorId: { type: mongoose_1.Schema.Types.ObjectId },
    orderId: { type: Number },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
const roomModel = (0, mongoose_1.model)('rooms', schema);
module.exports = roomModel;
