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
const addOns_category_1 = __importDefault(require("../../../controllers/vendor/addOns_category"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddItemAddOnsCategory: '/AddItemAddOnsCategory',
    getAddOns_CategoryByVendor: '/getAddOns_CategoryByVendor',
    EditItemAddOnsCategoryByVendor: '/EditItemAddOnsCategoryByVendor',
    getItemAddOnsCategoryDetails: '/getItemAddOnsCategoryDetails',
    ActiveDeactiveItemAddOnsCategory: '/ActiveDeactiveItemAddOnsCategory'
};
/**
 * Add Item AddOns Category
 */
router.post(exports.p.AddItemAddOnsCategory, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addOns_category_1.default.AddItemAddOnsCategory(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get Item AddOns Category
 */
router.post(exports.p.getAddOns_CategoryByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addOns_category_1.default.getAddOns_CategoryByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Edit Item AddOns Category
 */
router.post(exports.p.EditItemAddOnsCategoryByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addOns_category_1.default.EditItemAddOnsCategoryByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get Item AddOns Category details
 */
router.post(exports.p.getItemAddOnsCategoryDetails, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addOns_category_1.default.getItemAddOnsCategoryDetails(req.body, req.vendor.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Update Item AddOns Category status
 */
router.post(exports.p.ActiveDeactiveItemAddOnsCategory, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addOns_category_1.default.ActiveDeactiveItemAddOnsCategory(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
