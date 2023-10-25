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
const itemSize_1 = __importDefault(require("../../controllers/admin/itemSize"));
const authValidator_1 = require("../../utils/authValidator");
const _constants_1 = require("../../constants/index");
const schemaValidator_1 = require("../../utils/schemaValidator");
const itemSize_2 = require("../../validators/itemSize");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddItemMenuSize: '/add',
    listMenuSize: '/list',
    EditItemMenuSize: '/edit',
    getItemMenuSizeDetails: '/get',
    DeleteItemMenuSize: '/delete'
};
/**
 * Add Item Menu Size
 */
router.post(exports.p.AddItemMenuSize, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(itemSize_2.addSize), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield itemSize_1.default.AddItemMenuSize(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success });
}));
/**
 * Get Item Menu Size
 */
router.get(exports.p.listMenuSize, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield itemSize_1.default.listMenuSize(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Edit Item Menu Size
 */
router.put(exports.p.EditItemMenuSize, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(itemSize_2.editSize), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield itemSize_1.default.EditItemMenuSize(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success });
}));
/**
 * Get Item Menu Size details
 */
router.get(exports.p.getItemMenuSizeDetails, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield itemSize_1.default.getItemMenuSizeDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Delete Item Menu Size
 */
router.delete(exports.p.DeleteItemMenuSize, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield itemSize_1.default.DeleteItemMenuSize(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
// Export default
exports.default = router;
