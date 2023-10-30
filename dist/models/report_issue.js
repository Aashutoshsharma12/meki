"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report_issueModel = void 0;
const mongoose_1 = require("mongoose");
;
const schema = new mongoose_1.Schema({
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    messo_title: { type: String, default: '' },
    meso_desc: { type: String, default: '' },
    image: { type: String, default: '' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    ticketId: { type: String, default: '' },
    status: { type: String, default: 'pending' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});
exports.report_issueModel = (0, mongoose_1.model)('report_issues', schema);
