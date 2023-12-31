"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_1 = __importDefault(require("./address"));
const home_1 = __importDefault(require("./home"));
const rating_1 = __importDefault(require("./rating"));
const fav_vendor_1 = __importDefault(require("./fav_vendor"));
const order_1 = __importDefault(require("./order"));
const faq_1 = __importDefault(require("./faq"));
const report_issue_1 = __importDefault(require("./report_issue"));
const feedback_1 = __importDefault(require("./feedback"));
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use('/address', address_1.default);
baseRouter.use('/home', home_1.default);
baseRouter.use('/rating', rating_1.default);
baseRouter.use('/fav', fav_vendor_1.default);
baseRouter.use('/order', order_1.default);
baseRouter.use('/faq', faq_1.default);
baseRouter.use('/report_issue', report_issue_1.default);
baseRouter.use('/feedback', feedback_1.default);
// Export default.
exports.default = baseRouter;
