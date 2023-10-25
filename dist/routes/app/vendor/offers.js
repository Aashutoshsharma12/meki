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
const offers_1 = __importDefault(require("../../../controllers/vendor/offers"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
const multer_1 = __importDefault(require("../../../utils/multer"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddOfferByVendor: '/AddOfferByVendor',
    EditOfferByVendor: '/EditOfferByVendor',
    GetOfferListingByVendor: '/GetOfferListingByVendor',
    GetOfferDetailsByVendor: '/GetOfferDetailsByVendor',
    updateOfferStatusByVendor: '/updateOfferStatusByVendor',
    DeleteOfferByVendor: '/DeleteOfferByVendor',
    getOffersByUser: '/getOffersByUser',
    getOfferDetailsByUser: '/getOfferDetailsByUser'
};
/**
 * Add offer
 */
router.post(exports.p.AddOfferByVendor, authValidator_1.verifyAuthToken, multer_1.default.fields([{ name: "image", maxCount: 1 }]), (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield offers_1.default.AddOfferByVendor(req.body, req.user.id, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success, result: data });
}));
// Get vendor open closing
router.post(exports.p.EditOfferByVendor, authValidator_1.verifyAuthToken, multer_1.default.fields([{ name: "image", maxCount: 1 }]), (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = yield offers_1.default.EditOfferByVendor(req.body, req.user.id, (_b = req.files) === null || _b === void 0 ? void 0 : _b.image, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get open closing details
router.post(exports.p.GetOfferListingByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield offers_1.default.GetOfferListingByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Delete open close 
router.post(exports.p.GetOfferDetailsByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield offers_1.default.GetOfferDetailsByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get open closing details
router.post(exports.p.updateOfferStatusByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield offers_1.default.updateOfferStatusByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Delete open close 
router.post(exports.p.DeleteOfferByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield offers_1.default.DeleteOfferByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get open closing details
router.post(exports.p.getOffersByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield offers_1.default.getOffersByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Delete open close 
router.post(exports.p.getOfferDetailsByUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['user']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield offers_1.default.getOfferDetailsByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
