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
const auth_1 = __importDefault(require("../../../controllers/common_api/auth"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    login: '/login',
    signUp: '/sign-up',
    check: '/check-account',
    logout: '/logout'
};
/**
 * User SignUp
 */
router.post(exports.p.signUp, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.signUp(req.body, req.headers, req.ip);
    return res.status(CREATED).send({ data, code: CREATED });
}));
/**
 * Mark account Verified
 */
router.post(exports.p.check, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.checkAccount(req.body, req.headers);
    return res.status(OK).send({ data, code: OK });
}));
/**
 * User Login
 */
router.post(exports.p.login, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.login(req.body, req.headers, req.ip);
    return res.status(OK).send({ data, code: OK });
}));
/**
 * User Logout
 */
router.get(exports.p.logout, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.logOut(req.headers);
    return res.status(OK).send({ data, code: OK });
}));
// Export default
exports.default = router;
