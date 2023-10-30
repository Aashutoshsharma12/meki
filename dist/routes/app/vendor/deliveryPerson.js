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
const deliveryPerson_1 = __importDefault(require("../../../controllers/vendor/deliveryPerson"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
const multer_1 = __importDefault(require("../../../utils/multer"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    deliveryBoyLogin: '/deliveryBoyLogin',
    checkAccount: '/checkAccount',
    logOut: '/logOut',
    EditDeliveryProfile: '/EditDeliveryProfile',
    UpdateStatusByDeliveryPerson: '/UpdateStatusByDeliveryPerson',
    UpdateNotificationStatusByDeliveryBoy: '/UpdateNotificationStatusByDeliveryBoy',
    UpdateLanguageByDeliveryBoy: '/UpdateLanguageByDeliveryBoy',
    UpdateLocationByDeliveryBoy: '/UpdateLocationByDeliveryBoy'
};
/**
 * Login delivery boy
 */
router.post(exports.p.deliveryBoyLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.deliveryBoyLogin(req.body, req.headers, req.ip);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Check delivery boy account
router.post(exports.p.checkAccount, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.checkAccount(req.body, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Logout delivery boy
router.post(exports.p.logOut, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.logOut(req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Edit delivery boy profile
router.post(exports.p.EditDeliveryProfile, authValidator_1.verifyAuthToken, multer_1.default.fields([{ name: "image", maxCount: 1 }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield deliveryPerson_1.default.EditDeliveryProfile(req.body, req.user.id, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Update online status
router.post(exports.p.UpdateStatusByDeliveryPerson, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.UpdateStatusByDeliveryPerson(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Update notification status
router.post(exports.p.UpdateNotificationStatusByDeliveryBoy, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.UpdateNotificationStatusByDeliveryBoy(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Update language
router.post(exports.p.UpdateLanguageByDeliveryBoy, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.UpdateLanguageByDeliveryBoy(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Update location
router.post(exports.p.UpdateLocationByDeliveryBoy, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.UpdateLocationByDeliveryBoy(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
