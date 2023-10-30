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
const express_1 = require("express");
const order_1 = __importDefault(require("../../controllers/admin/order"));
const authValidator_1 = require("../../utils/authValidator");
const http_status_codes_1 = require("http-status-codes");
const _constants_1 = require("../../constants/index");
const router = (0, express_1.Router)();
const { OK, CREATED } = http_status_codes_1.StatusCodes;
exports.p = {
    userOrderList: 'userOrderList'
};
router.get('/userOrderList', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.user_orderList(req.query);
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.recordFetched });
}));
exports.default = router;
