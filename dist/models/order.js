"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    vendorId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderId: { type: String },
    items: [{
            categoryId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'category'
            },
            discount: {
                type: Number,
                default: 0
            },
            orderId: {
                type: String
            },
            itemId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'item'
            },
            size: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'menu_size'
            },
            per_item_price: {
                type: Number,
                default: 0
            },
            quantity: {
                type: Number,
                default: 0
            },
            item_price: {
                type: Number,
                default: 0
            },
            addOn: [{
                    addonId: {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: 'addOns'
                    },
                    title: {
                        type: String,
                        default: ''
                    },
                    per_addon_price: {
                        type: Number,
                        default: 0
                    },
                    quantity: {
                        type: Number,
                        default: 0
                    },
                    item_addon_price: {
                        type: Number,
                        default: 0
                    },
                }]
        }],
    timeStamp: { type: String },
    promocode: { type: String },
    note: { type: String },
    promoCode_Amount: { type: Number },
    sub_total: { type: Number },
    convience_tax: { type: Number },
    grand_total: { type: Number },
    total_discount: { type: Number },
    tax: { type: Number },
    address: { type: String },
    delivery_time: { type: String },
    city: { type: String },
    order_lat: { type: String },
    order_long: { type: String },
    status: { type: String },
    order_Date: { type: String },
    rating: { type: Number },
    order_time: { type: String },
    delivery_personId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'deliveryPersons' },
    delivery_charge: { type: Number },
    deliveryPerson_otp: { type: Number },
    deliveryPerson_Status: { type: String },
    item_collect: { type: Boolean, default: false },
    dpExpMessageId: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'dpExpMessage' }],
    deliveryPersonStatus_track: [{
            status: {
                type: String,
                default: 'pending'
            },
            statusDate: {
                type: Date
            },
            acceptTime: {
                type: String,
                default: ''
            }
        }],
    track_status: [{
            status: {
                type: String,
                default: 'pending'
            },
            statusDate: {
                type: Date
            },
            acceptTime: {
                type: String,
                default: ''
            }
        }],
    admin_tax: { type: Number },
    petAtHome: { type: Boolean, default: false },
    leaveAtDoor: { type: Boolean, default: false },
    paymentType: { type: String },
    paymentStatus: { type: Boolean },
    cancelledBy: { type: String }
}, {
    timestamps: true,
    versionKey: false
});
const orderModel = (0, mongoose_1.model)('orders', schema);
module.exports = orderModel;
