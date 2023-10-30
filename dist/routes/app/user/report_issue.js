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
const report_issue_1 = __importDefault(require("../../../controllers/user/report_issue"));
const authValidator_1 = require("../../../utils/authValidator");
const _constants_1 = require("../../../constants/index");
const multer_1 = __importDefault(require("../../../utils/multer"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    addReportAndIssue: '/addReportAndIssue',
    getReportAndIssueByUser: '/getReportAndIssueByUser',
    getReportAndIssueDetails: '/getReportAndIssueDetails',
    getReportAndIssueMessage: '/getReportAndIssueMessage'
};
/**
 * Get faq category list
 */
router.post(exports.p.addReportAndIssue, multer_1.default.fields([{ name: "image", maxCount: 1 }]), authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield report_issue_1.default.addReportAndIssue(req.body, req.user.id, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get faqs
 */
router.post(exports.p.getReportAndIssueByUser, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield report_issue_1.default.getReportAndIssueByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get faqs
 */
router.post(exports.p.getReportAndIssueDetails, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield report_issue_1.default.getReportAndIssueDetails(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Get faqs
 */
router.post(exports.p.getReportAndIssueMessage, authValidator_1.verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield report_issue_1.default.getReportAndIssueMessage(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
