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
const item_category_1 = __importDefault(require("../../controllers/admin/item_category"));
const authValidator_1 = require("../../utils/authValidator");
const _constants_1 = require("../../constants/index");
const schemaValidator_1 = require("../../utils/schemaValidator");
const admin_1 = require("../../validators/admin");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddItemCategory: '/AddItemCategory',
    ItemCategoryList: '/ItemCategoryList',
    EditItemCategory: '/EditItemCategory',
    getItemCategoryDetails: '/getItemCategoryDetails',
    deleteItemCategory: '/deleteItemCategory'
};
/**
 * Add Item Category
 */
router.post(exports.p.AddItemCategory, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(admin_1.AddItemCategory), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_category_1.default.AddItemCategory(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success });
}));
/**
 * List Item Category
 */
router.get(exports.p.ItemCategoryList, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(admin_1.listItemCat), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_category_1.default.ItemCategoryList(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Edit Item Category
 */
router.put(exports.p.EditItemCategory, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(admin_1.EditItemCategory), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_category_1.default.EditItemCategory(req.body);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Get Item Category details
 */
router.get(exports.p.getItemCategoryDetails, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(admin_1.getItemCat), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_category_1.default.getItemCategoryDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Delete Item Category
 */
router.delete(exports.p.deleteItemCategory, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(admin_1.getItemCat), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_category_1.default.deleteItemCategory(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
// Export default
exports.default = router;
