"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const item_category_1 = __importDefault(require("./item_category"));
const addOns_category_1 = __importDefault(require("./addOns_category"));
const addOns_1 = __importDefault(require("./addOns"));
const menu_size_1 = __importDefault(require("./menu_size"));
const item_1 = __importDefault(require("./item"));
const open_closing_1 = __importDefault(require("./open_closing"));
const offers_1 = __importDefault(require("./offers"));
const branch_1 = __importDefault(require("./branch"));
const deliveryPerson_1 = __importDefault(require("./deliveryPerson"));
const deliveryPerson_order_1 = __importDefault(require("./deliveryPerson_order"));
const message_1 = __importDefault(require("./message"));
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use('/category', category_1.default);
baseRouter.use('/item_category', item_category_1.default);
baseRouter.use('/addOns_category', addOns_category_1.default);
baseRouter.use('/addOns', addOns_1.default);
baseRouter.use('/menu_size', menu_size_1.default);
baseRouter.use('/item', item_1.default);
baseRouter.use('/openClose', open_closing_1.default);
baseRouter.use('/offer', offers_1.default);
baseRouter.use('/branch', branch_1.default);
baseRouter.use('/delivery', deliveryPerson_1.default);
baseRouter.use('/dpOrder', deliveryPerson_order_1.default);
baseRouter.use('/message', message_1.default);
// Export default.
exports.default = baseRouter;
