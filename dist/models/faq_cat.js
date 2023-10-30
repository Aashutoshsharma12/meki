"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faq_catModel = void 0;
const mongoose_1 = require("mongoose");
;
const schema = new mongoose_1.Schema({
    name: { type: String, default: '' },
    messo_name: { type: String, default: '' },
    lower_name: { type: String, default: '' },
    lower_messo_name: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
exports.faq_catModel = (0, mongoose_1.model)('faq_cats', schema);
