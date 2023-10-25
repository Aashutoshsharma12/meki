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
const user_1 = __importDefault(require("../../controllers/admin/user"));
const schemaValidator_1 = require("../../utils/schemaValidator");
const authValidator_1 = require("../../utils/authValidator");
const multer_1 = __importDefault(require("../../utils/multer"));
const deliveryPerson_1 = require("../../validators/deliveryPerson");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    list: '/list',
    userExcelList: '/userExcelList',
    deleteUser: '/deleteUser',
    vendorList: '/vendorList',
    vendorDetails: '/vendorDetails',
    edit: '/edit',
    updateStatus: '/updateStatus'
};
/**
 * User List
 */
router.get(exports.p.list, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(["Admin"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_1.default.getUsers(req.query, req.headers);
    return res.status(OK).send({ data, code: OK });
}));
//***********deleteUser******** */
router.post(exports.p.deleteUser, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_1.default.deleteUser(req.body);
    return res.status(OK).send({ data, code: OK });
}));
/**
 * User Excel data
 */
router.get(exports.p.userExcelList, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(["Admin"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_1.default.userExcelList();
    return res.status(OK).send({ data, code: OK });
}));
/**
 * Edit vendor
 */
router.put(exports.p.edit, multer_1.default.fields([{ name: 'image', maxcount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(["Admin"]), (0, schemaValidator_1.schemaValidator)(deliveryPerson_1.editVendor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield user_1.default.editVendor(req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image);
    return res.status(CREATED).send({ data, code: CREATED });
}));
/**
 * update vendor status
 */
router.get(exports.p.updateStatus, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(["Admin"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_1.default.vendorStatus(req.query);
    return res.status(OK).send({ data, code: OK });
}));
/**
 * Vendor List
 */
router.get(exports.p.vendorList, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(["Admin"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_1.default.vendorList(req.query);
    return res.status(OK).send({ data, code: OK });
}));
/**
 * vendorDetails
 */
router.get(exports.p.vendorDetails, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(["Admin"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_1.default.vendorDetails(req.query);
    return res.status(OK).send({ data, code: OK });
}));
// Export default
exports.default = router;
