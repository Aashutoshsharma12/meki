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
const authValidator_1 = require("../../utils/authValidator");
const category_1 = __importDefault(require("../../controllers/admin/category"));
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const _constants_1 = require("../../constants/index");
const schemaValidator_1 = require("../../utils/schemaValidator");
const category_2 = require("../../validators/category");
const multer_1 = __importDefault(require("../../utils/multer"));
const router = (0, express_1.Router)();
const { OK, CREATED } = http_status_codes_1.StatusCodes;
exports.p = {
    list: '/list',
    add: '/add',
    edit: '/edit',
    get: '/get',
    updateStatus: '/updateStatus/:id',
    delete: '/delete/:id'
};
router.get(exports.p.list, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.listCat(req.query);
    return res.status(OK).json({ message: _constants_1.success.en.recordFetched, code: OK, data });
}));
router.post(exports.p.add, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(category_2.addCat), multer_1.default.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.addCat(req.query, req.file);
    return res.status(CREATED).json({ message: _constants_1.success.en.categoryAdded, code: CREATED, data });
}));
router.put(exports.p.edit, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(category_2.editCat), multer_1.default.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.file?.image,"lldldd",req.file)
    const data = yield category_1.default.editCat(req.query, req.file);
    return res.status(CREATED).json({ message: _constants_1.success.en.updateSuccefully, code: CREATED, data });
}));
router.get(exports.p.get, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.getCat(req.query);
    return res.status(OK).json({ message: _constants_1.success.en.recordFetched, code: OK, data });
}));
router.put(exports.p.updateStatus, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.updateStatus(req.query, req.params);
    return res.status(OK).json({ message: _constants_1.success.en.updateSuccefully, code: OK, data });
}));
router.delete(exports.p.delete, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.deleteCat(req.params);
    return res.status(OK).json({ message: _constants_1.success.en.updateSuccefully, code: OK, data });
}));
exports.default = router;
