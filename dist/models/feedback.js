"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackModel = void 0;
const mongoose_1 = require("mongoose");
;
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    feedback: { type: String },
    role: { type: String, default: 'user' },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.feedbackModel = (0, mongoose_1.model)('feedbacks', schema);
