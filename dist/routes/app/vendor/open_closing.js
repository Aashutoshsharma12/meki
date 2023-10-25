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
const open_closing_1 = __importDefault(require("../../../controllers/vendor/open_closing"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddVendorOpenClosing: '/AddVendorOpenClosing',
    getVendorOpenClosing: '/getVendorOpenClosing',
    getOpenCloseDetail: '/getOpenCloseDetail',
    deleteOpenClose: '/deleteOpenClose'
};
/**
 * Add open closing
 */
router.post(exports.p.AddVendorOpenClosing, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield open_closing_1.default.AddVendorOpenClosing(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success, result: data });
}));
// Get vendor open closing
router.post(exports.p.getVendorOpenClosing, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield open_closing_1.default.getVendorOpenClosing(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get open closing details
router.post(exports.p.getOpenCloseDetail, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield open_closing_1.default.getOpenCloseDetail(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Delete open close 
router.post(exports.p.deleteOpenClose, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield open_closing_1.default.deleteOpenClose(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
