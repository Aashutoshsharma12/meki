"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const category_1 = __importDefault(require("./category"));
const restaurant_1 = __importDefault(require("./restaurant"));
const explore_1 = __importDefault(require("./explore"));
const item_category_1 = __importDefault(require("./item_category"));
const item_1 = __importDefault(require("./item"));
const addons_cat_1 = __importDefault(require("./addons_cat"));
const addons_1 = __importDefault(require("./addons"));
const itemSize_1 = __importDefault(require("./itemSize"));
const deliveryPerson_1 = __importDefault(require("./deliveryPerson"));
const order_1 = __importDefault(require("./order"));
const cancelReason_1 = __importDefault(require("./cancelReason"));
// Export the base-router
const adminbaseRouter = (0, express_1.Router)();
// Setup routers
adminbaseRouter.use('/auth', auth_1.default);
adminbaseRouter.use('/user', user_1.default);
adminbaseRouter.use('/category', category_1.default);
adminbaseRouter.use('/restaurant', restaurant_1.default);
adminbaseRouter.use('/explore', explore_1.default);
adminbaseRouter.use('/item_category', item_category_1.default);
adminbaseRouter.use('/menuItem', item_1.default);
adminbaseRouter.use('/addons_cat', addons_cat_1.default);
adminbaseRouter.use('/addons', addons_1.default);
adminbaseRouter.use('/itemSize', itemSize_1.default);
adminbaseRouter.use('/deliveryPerson', deliveryPerson_1.default);
adminbaseRouter.use('/order', order_1.default);
adminbaseRouter.use('/cancelReason', cancelReason_1.default);
// Export default.
exports.default = adminbaseRouter;
