"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const mongoose_1 = __importStar(require("mongoose"));
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lower_name: { type: String },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    countryCode: { type: String, required: true, default: '+91' },
    role: { type: String, required: true },
    gender: { type: String },
    dob: { type: String },
    branchNo: { type: String },
    isPhoneVerified: { type: Boolean, default: true },
    image: { type: String },
    language: { type: String, default: "en" },
    catId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'category' },
    exploreId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'explore' },
    vendorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    branchType: { type: String, default: "Main" },
    restaurantName: { type: String },
    restaurant_mesoName: { type: String },
    adminPercentage: { type: Number },
    restaurantImage: { type: String },
    totalBranch: { type: Number, default: 1 },
    status: { type: String, default: "Disapproved" },
    documents: { type: String },
    document_status: { type: Boolean, default: false },
    addBy: { type: String },
    vendor_status: { type: String, default: "Accepted" },
    branchDetails: {
        delivery_charges: { type: Number },
        minimum_orderAmount: { type: Number },
        openingTime: { type: String },
        closingTime: { type: String },
        mobileNo: { type: String },
        countryCode: { type: String },
        max_deliveryTime: { type: String },
        branchImage: { type: String },
        paymentMehod: [],
        addressDetails: {
            country: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String },
            fullAddress: { type: String, required: true }
        }
    },
    rating: { type: Number, default: 0 },
    total_order: { type: Number, default: 0 },
    categoryId: [],
    food_type: [],
    itemId: [],
    item_price: { type: Number },
    // delivery_time:{type:String},
    lat: { type: String },
    long: { type: String },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});
const userModel = (0, mongoose_1.model)('User', schema);
module.exports = userModel;
