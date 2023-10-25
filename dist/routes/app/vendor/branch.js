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
const branch_1 = __importDefault(require("../../../controllers/vendor/branch"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
const multer_1 = __importDefault(require("../../../utils/multer"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    GetVendorBranchs: '/GetVendorBranchs',
    GetBranchDetailsByVendor: '/GetBranchDetailsByVendor',
    EditBranchImageByVendor: '/EditBranchImageByVendor',
    EditBranchMobileByVendor: '/EditBranchMobileByVendor',
    SearchVendorBranch: '/SearchVendorBranch',
    UpdateOnlineOfflineStatus: '/UpdateOnlineOfflineStatus'
};
// Get vendor branch
router.post(exports.p.GetVendorBranchs, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield branch_1.default.GetVendorBranchs(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Get vendor branch detail
router.post(exports.p.GetBranchDetailsByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield branch_1.default.GetBranchDetailsByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Edit branch image by vendor
router.post(exports.p.EditBranchImageByVendor, authValidator_1.verifyAuthToken, multer_1.default.fields([{ name: "image", maxCount: 1 }]), (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield branch_1.default.EditBranchImageByVendor(req.body, req.user.id, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Edit branch number by vendor
router.post(exports.p.EditBranchMobileByVendor, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield branch_1.default.EditBranchMobileByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Search branch by vendor
router.post(exports.p.SearchVendorBranch, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield branch_1.default.SearchVendorBranch(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Update branch status
router.post(exports.p.UpdateOnlineOfflineStatus, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['vendor']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield branch_1.default.UpdateOnlineOfflineStatus(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
