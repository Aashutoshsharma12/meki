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
const deliveryPerson_order_1 = __importDefault(require("../../../controllers/vendor/deliveryPerson_order"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    updateOrderStatusByDp: '/updateOrderStatusByDp',
    GetYesterdayEarningByDPerson: '/GetYesterdayEarningByDPerson',
    updateCollectItemStatusBydPerson: '/updateCollectItemStatusBydPerson',
    getDpExperienceMessage: '/getDpExperienceMessage',
    updateDpExpMessage: '/updateDpExpMessage',
    getOngoingOrderByDperson: '/getOngoingOrderByDperson',
    GetOrderListingBasedOnStatus: '/GetOrderListingBasedOnStatus',
    getOrderDetailsByDPerson: '/getOrderDetailsByDPerson'
};
/**
 * Update order status by delivery person
 */
router.post(exports.p.updateOrderStatusByDp, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.updateOrderStatusByDp(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get yesterday earning by delivery person
router.post(exports.p.GetYesterdayEarningByDPerson, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.GetYesterdayEarningByDPerson(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Update item collect by delivery person
router.post(exports.p.updateCollectItemStatusBydPerson, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.updateCollectItemStatusBydPerson(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get user experience message by delivery person
router.post(exports.p.getDpExperienceMessage, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.getDpExperienceMessage(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Update experience message in order by delivery person
router.post(exports.p.updateDpExpMessage, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.updateDpExpMessage(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get ongoing order for delivery person
router.post(exports.p.getOngoingOrderByDperson, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.getOngoingOrderByDperson(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get order listing based on status
router.post(exports.p.GetOrderListingBasedOnStatus, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.GetOrderListingBasedOnStatus(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get order details by delivery person
router.post(exports.p.getOrderDetailsByDPerson, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_order_1.default.getOrderDetailsByDPerson(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
