"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const item_1 = __importDefault(require("../../../controllers/vendor/item"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
const multer_1 = __importDefault(require("../../../utils/multer"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddItemByVendor: '/AddItemByVendor',
    getItemByVendor: '/getItemByVendor',
    EditItemByVendor: '/EditItemByVendor',
    getItemDetails: '/getItemDetails',
    ActiveDeactiveItem: '/ActiveDeactiveItem',
    DeleteItemMenu: '/DeleteItemMenu',
    getItemByUser: '/getItemByUser',
    getMenuListCountByUser: '/getMenuListCountByUser'
};
/**
 * Add Item
 */
router.post(exports.p.AddItemByVendor, multer_1.default.fields([{ name: "image", maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield item_1.default.AddItemByVendor(req.body, req.user.id, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get Item
 */
router.post(exports.p.getItemByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.getItemByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Edit Item
 */
router.post(exports.p.EditItemByVendor, multer_1.default.fields([{ name: "image", maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = yield item_1.default.EditItemByVendor(req.body, req.user.id, (_b = req.files) === null || _b === void 0 ? void 0 : _b.image, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get Item details
 */
router.post(exports.p.getItemDetails, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.getItemDetails(req.body, req.vendor.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Update Item status
 */
router.post(exports.p.ActiveDeactiveItem, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.ActiveDeactiveItem(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Delete Item
 */
router.post(exports.p.DeleteItemMenu, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.DeleteItemMenu(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get Item by user
 */
router.post(exports.p.getItemByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.getItemByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get menu item count by user
 */
router.post(exports.p.getMenuListCountByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.getMenuListCountByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
