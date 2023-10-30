"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_api_1 = __importDefault(require("./common_api"));
const vendor_1 = __importDefault(require("./vendor"));
const user_1 = __importDefault(require("./user"));
// import agentRoute from './agent'
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use('/common', common_api_1.default);
baseRouter.use('/vendor', vendor_1.default);
baseRouter.use('/user', user_1.default);
// baseRouter.use('/agent', agentRoute)
// Export default.
exports.default = baseRouter;
