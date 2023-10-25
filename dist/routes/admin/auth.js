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
const auth_1 = __importDefault(require("../../controllers/admin/auth"));
const schemaValidator_1 = require("../../utils/schemaValidator");
const admin_1 = require("../../validators/admin");
const authValidator_1 = require("../../utils/authValidator");
const _constants_1 = require("../../constants/index");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    register: '/signup',
    login: '/login',
    changePassword: '/change-password',
    logout: '/logout'
};
/**
 * Login & SignUp  Admin
 */
router.post(exports.p.register, (0, schemaValidator_1.schemaValidator)(admin_1.signUpSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.registerAdmin(req.body, req.headers);
    return res.status(CREATED).send({ data, code: CREATED });
}));
//***********Login******** */
router.post(exports.p.login, (0, schemaValidator_1.schemaValidator)(admin_1.loginSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.login(req.body, req.headers);
    return res.status(OK).send({ data, code: OK });
}));
//**********Change Password*********** */
router.post(exports.p.changePassword, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(admin_1.changePasswordSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.changePassword(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK });
}));
//**********Logout*********** */
router.get(exports.p.logout, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_1.default.logOut(req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.logOutSuccessful });
}));
// Export default
exports.default = router;
