"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqModel = void 0;
const mongoose_1 = require("mongoose");
;
const schema = new mongoose_1.Schema({
    faq_cat: { type: mongoose_1.Schema.Types.ObjectId, ref: 'faq_cats' },
    question: { type: String },
    messo_question: { type: String },
    lower_question: { type: String },
    lower_messo_question: { type: String },
    answer: { type: String },
    messo_answer: { type: String },
    role: { type: String, enum: ['customer', "businessOwner", "deliveryPerson"] },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
exports.faqModel = (0, mongoose_1.model)('faq', schema);
