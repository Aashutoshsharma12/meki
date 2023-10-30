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
const router = (0, express_1.Router)();
const restaurant_1 = __importDefault(require("../../controllers/admin/restaurant"));
const authValidator_1 = require("../../utils/authValidator");
const http_status_codes_1 = require("http-status-codes");
const _constants_1 = require("../../constants/index");
const multer_1 = __importDefault(require("../../utils/multer"));
const schemaValidator_1 = require("../../utils/schemaValidator");
const restaurant_2 = require("../../validators/restaurant");
const { OK, CREATED } = http_status_codes_1.StatusCodes;
exports.p = {
    list: '/list',
    add: '/add',
    add_branch: '/add_branch',
    edit: '/edit',
    edit_branch: '/edit_branch',
    details: '/details',
    documents_upload: '/documents_upload',
    updateStatus: '/update_status',
    branch_list: '/branchList',
    documents_upload_body: '/upload_document'
};
router.get(exports.p.list, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield restaurant_1.default.list(req.query);
    return res.status(OK).json({ message: _constants_1.success.en.recordFetched, code: OK, data });
}));
router.post(exports.p.add, multer_1.default.fields([{ name: 'restaurantImage', maxCount: 1 }, { name: 'branchImage', maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(restaurant_2.addResturant), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const data = yield restaurant_1.default.addResturant(req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.restaurantImage, (_b = req.files) === null || _b === void 0 ? void 0 : _b.branchImage);
    return res.status(CREATED).json({ message: _constants_1.success.en.addRestaurant, code: CREATED, data });
}));
router.post(exports.p.add_branch, multer_1.default.fields([{ name: 'branchImage', maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(restaurant_2.add_branch), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const data = yield restaurant_1.default.addResturant_branch(req.body, (_c = req.files) === null || _c === void 0 ? void 0 : _c.branchImage);
    return res.status(CREATED).json({ message: _constants_1.success.en.addRestaurant, code: CREATED, data });
}));
router.get(exports.p.branch_list, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield restaurant_1.default.branchList(req.query);
    return res.status(OK).json({ message: _constants_1.success.en.recordFetched, code: OK, data });
}));
router.put(exports.p.edit, multer_1.default.fields([{ name: 'restaurantImage', maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const data = yield restaurant_1.default.editResturant(req.body, (_d = req.files) === null || _d === void 0 ? void 0 : _d.restaurantImage);
    return res.status(CREATED).json({ message: _constants_1.success.en.updateSuccefully, code: CREATED, data });
}));
router.put(exports.p.edit_branch, multer_1.default.fields([{ name: 'branchImage', maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(restaurant_2.editResturant_branch), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const data = yield restaurant_1.default.editResturant_branch(req.body, (_e = req.files) === null || _e === void 0 ? void 0 : _e.branchImage);
    return res.status(CREATED).json({ message: _constants_1.success.en.updateSuccefully, code: CREATED, data });
}));
router.get(exports.p.details, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield restaurant_1.default.details(req.query);
    return res.status(OK).json({ message: _constants_1.success.en.recordFetched, code: OK, data });
}));
router.put(exports.p.documents_upload, multer_1.default.fields([{ name: 'image', maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const data = yield restaurant_1.default.documents_upload(req.body, (_f = req.files) === null || _f === void 0 ? void 0 : _f.image);
    return res.status(CREATED).json({ message: _constants_1.success.en.doc_upload, code: CREATED, data });
}));
router.post(exports.p.documents_upload_body, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield restaurant_1.default.documents_upload_body(req.body);
    return res.status(CREATED).json({ message: _constants_1.success.en.doc_upload, code: CREATED, data });
}));
router.put(exports.p.updateStatus, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(restaurant_2.updateStatus), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield restaurant_1.default.updateStatus(req.body);
    return res.status(CREATED).json({ message: _constants_1.success.en.updateStatus, code: CREATED, data });
}));
exports.default = router;
