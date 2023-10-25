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
    vendorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'restaurant' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    bankDetails: {
        bankName: { type: String },
        IFSC_code: { type: String },
        cr_number: { type: String },
        branchNumber: { type: String },
        accountNumber: { type: String },
    }
}, {
    timestamps: true,
    versionKey: false
});
const bank_detailsModel = (0, mongoose_1.model)('bank_details', schema);
module.exports = bank_detailsModel;
