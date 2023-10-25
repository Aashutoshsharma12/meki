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
const address_1 = __importDefault(require("../../../controllers/user/address"));
const schemaValidator_1 = require("../../../utils/schemaValidator");
const authValidator_1 = require("../../../utils/authValidator");
const user_1 = require("../../../validators/user");
const _constants_1 = require("../../../constants/index");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    register: '/register',
    addressEdit: '/addressEdit',
    addressList: '/addressList',
    addressDelete: '/addressDelete',
};
/**
 * Address register
 */
router.post(exports.p.register, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (0, schemaValidator_1.schemaValidator)(user_1.registerAddressSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield address_1.default.addressRegister(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success, result: data });
}));
/**
 * Address Edit
 */
router.put(exports.p.addressEdit, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (0, schemaValidator_1.schemaValidator)(user_1.registerAddressSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield address_1.default.addressEdit(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Address List
 */
router.get(exports.p.addressList, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield address_1.default.addressList(req.query, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Address Delete
 */
router.delete(exports.p.addressDelete, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield address_1.default.addressDelete(req.query, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK });
}));
// Export default
exports.default = router;
