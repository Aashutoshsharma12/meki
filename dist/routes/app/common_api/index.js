"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const faq_1 = __importDefault(require("./faq"));
const notification_1 = __importDefault(require("./notification"));
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use('/auth', auth_1.default);
baseRouter.use('/faq', faq_1.default);
baseRouter.use('/notification', notification_1.default);
// Export default.
exports.default = baseRouter;
