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
const deliveryPerson_1 = __importDefault(require("../../controllers/admin/deliveryPerson"));
const http_status_codes_1 = require("http-status-codes");
const multer_1 = __importDefault(require("../../utils/multer"));
const authValidator_1 = require("../../utils/authValidator");
const _constants_1 = require("../../constants/index");
const schemaValidator_1 = require("../../utils/schemaValidator");
const deliveryPerson_2 = require("../../validators/deliveryPerson");
const route = (0, express_1.Router)();
const { OK, CREATED } = http_status_codes_1.StatusCodes;
exports.p = {
    add: '/add',
    edit: '/edit',
    get: '/get',
    list: '/list',
    delete: '/delete'
};
route.post(exports.p.add, multer_1.default.fields([{ name: 'image', maxcount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(deliveryPerson_2.add), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.files, "dldld");
    const data = yield deliveryPerson_1.default.addDeliveryPerson(req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image);
    return res.status(CREATED).json({ data, message: _constants_1.success.en.success, code: CREATED });
}));
route.put(exports.p.edit, multer_1.default.fields([{ name: 'image', maxcount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(deliveryPerson_2.edit), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = yield deliveryPerson_1.default.editDeliveryPerson(req.body, (_b = req.files) === null || _b === void 0 ? void 0 : _b.image);
    return res.status(CREATED).json({ data, message: _constants_1.success.en.success, code: CREATED });
}));
route.get(exports.p.get, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(deliveryPerson_2.get), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.getDeliveryPerson(req.query);
    return res.status(OK).json({ data, message: _constants_1.success.en.recordFetched, code: OK });
}));
route.get(exports.p.list, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.listDeliveryPerson(req.query);
    return res.status(OK).json({ data, message: _constants_1.success.en.recordFetched, code: OK });
}));
route.delete(exports.p.delete, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(deliveryPerson_2.get), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deliveryPerson_1.default.deleteDeliveryPerson(req.query);
    return res.status(OK).json({ data, message: _constants_1.success.en.success, code: OK });
}));
exports.default = route;
