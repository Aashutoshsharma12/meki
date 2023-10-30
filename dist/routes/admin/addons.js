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
const addons_1 = __importDefault(require("../../controllers/admin/addons"));
const authValidator_1 = require("../../utils/authValidator");
const _constants_1 = require("../../constants/index");
const schemaValidator_1 = require("../../utils/schemaValidator");
const addons_cat_1 = require("../../validators/addons_cat");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddItemAddOns: '/add',
    listAddOns_Category: '/list',
    EditItemAddOns: '/edit',
    getItemAddOnsDetails: '/get',
    deleteAddons: '/delete'
};
/**
 * Add Item AddOns
 */
router.post(exports.p.AddItemAddOns, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(addons_cat_1.addaddons), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addons_1.default.AddItemAddOns(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success });
}));
/**
 * List Item AddOns
 */
router.get(exports.p.listAddOns_Category, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addons_1.default.listAddOns_Category(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Edit Item AddOns
 */
router.put(exports.p.EditItemAddOns, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(addons_cat_1.editaddons), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addons_1.default.EditItemAddOns(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success });
}));
/**
 * Get Item AddOns  details
 */
router.get(exports.p.getItemAddOnsDetails, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addons_1.default.getItemAddOnsDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Delete Item AddOns
 */
router.delete(exports.p.deleteAddons, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield addons_1.default.DeleteItemAddons(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
// Export default
exports.default = router;
