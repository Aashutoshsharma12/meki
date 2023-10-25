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
const order_1 = __importDefault(require("../../../controllers/user/order"));
//import schemaValidator from '../../../utils/schemaValidator';
const authValidator_1 = require("../../../utils/authValidator");
//import { registerAddressSchema } from "../../../validators/user";
const _constants_1 = require("../../../constants/index");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddCartByUser: '/AddCartByUser',
    GetOrderListByUser: '/GetOrderListByUser',
    GetOrderDetailsByUser: '/GetOrderDetailsByUser',
    GetOrderListByVendor: '/GetOrderListByVendor',
    GetOrderHistoryByVendor: '/GetOrderHistoryByVendor',
    GetOrderDetailsByVendor: '/GetOrderDetailsByVendor',
    UpdateOrderStatusByVendor: '/UpdateOrderStatusByVendor',
    UpdateOrderStatusByUser: '/UpdateOrderStatusByUser',
    MakeAnOrderByUser: '/MakeAnOrderByUser',
    UpdateDeliveryTimeByVendor: '/UpdateDeliveryTimeByVendor',
    getOrderListingForU: '/getOrderListingForU',
    GetOrderListingForVen: '/GetOrderListingForVen',
    getOrderStatusCountByVendor: '/getOrderStatusCountByVendor'
};
/**
 * Add cart
 */
router.post(exports.p.AddCartByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.AddCartByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get order listing by user
 */
router.post(exports.p.GetOrderListByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.GetOrderListByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get order details by user
 */
router.post(exports.p.GetOrderDetailsByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.GetOrderDetailsByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get order listing by vendor
 */
router.post(exports.p.GetOrderListByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.GetOrderListByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get order history by vendor
 */
router.post(exports.p.GetOrderHistoryByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.GetOrderHistoryByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get order details by vendor
 */
router.post(exports.p.GetOrderDetailsByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.GetOrderDetailsByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Update order status by vendor
 */
router.post(exports.p.UpdateOrderStatusByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.UpdateOrderStatusByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Update order status by user
 */
router.post(exports.p.UpdateOrderStatusByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.UpdateOrderStatusByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Make an order by user
 */
router.post(exports.p.MakeAnOrderByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.MakeAnOrderByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Update order delivery time by vendor
 */
router.post(exports.p.UpdateDeliveryTimeByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.UpdateDeliveryTimeByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get order listing for user
 */
router.post(exports.p.getOrderListingForU, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.getOrderListingForU(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get order listing for vendor
 */
router.post(exports.p.GetOrderListingForVen, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.GetOrderListingForVen(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get orders status count for vendor
 */
router.get(exports.p.getOrderStatusCountByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_1.default.getOrderStatusCountByVendor(req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
