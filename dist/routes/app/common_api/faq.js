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
const faq_1 = __importDefault(require("../../../controllers/common_api/faq"));
const http_status_codes_1 = require("http-status-codes");
const authValidator_1 = require("../../../utils/authValidator");
const schemaValidator_1 = require("../../../utils/schemaValidator");
const _constants_1 = require("../../../constants/index");
const faq_2 = require("../../../validators/faq");
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.StatusCodes;
exports.p = {
    add: '/add',
    edit: '/edit',
    get: '/get',
    list: '/list',
    delete: '/delete',
    addFaqCat: '/addFaqCat',
    editFaqCat: '/editFaqCat',
    getFaqCat: '/getFaqCat',
    faqCatList: '/faqCatList',
    deleteFaqCat: '/deleteFaqCat',
    all_faqCat: '/all_faqCat'
};
router.post('/add', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(faq_2.addFaq), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.addFaq(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: _constants_1.success.en.success });
}));
router.put('/edit', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(faq_2.editFaq), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.editFaq(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: _constants_1.success.en.success });
}));
router.get('/get', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(faq_2.getDetails), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.getDetails(req.query);
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.recordFetched });
}));
router.get('/list', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.list(req.query);
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.recordFetched });
}));
router.delete('/delete', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(faq_2.getDetails), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.deleteFaq(req.query);
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.success });
}));
//faq category
router.post('/addFaqCat', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(faq_2.addFaqCat), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.addFaqCat(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: _constants_1.success.en.success });
}));
router.put('/editFaqCat', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(faq_2.editFaqCat), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.editFaqCat(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: _constants_1.success.en.success });
}));
router.get('/getFaqCat', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(faq_2.getFaqCat), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.getFaqCatDetails(req.query);
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.recordFetched });
}));
router.get('/faqCatList', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.faqCatList(req.query);
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.recordFetched });
}));
router.delete('/deleteFaqCat', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator1)(faq_2.getFaqCat), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.deleteFaqCat(req.query);
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.success });
}));
router.get('/all_faqCat', authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield faq_1.default.all_faqCat();
    return res.status(OK).json({ data, code: OK, message: _constants_1.success.en.recordFetched });
}));
exports.default = router;
