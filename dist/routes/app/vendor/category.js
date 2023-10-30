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
const category_1 = __importDefault(require("../../../controllers/vendor/category"));
const schemaValidator_1 = require("../../../utils/schemaValidator");
const auth_1 = require("../../../validators/auth");
const _constants_1 = require("../../../constants/index");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    categoryListForUser: '/categoryListForUser',
    exploreListForUser: '/exploreListForUser'
};
/**
 *Category List For Users
 */
router.post(exports.p.categoryListForUser, (0, schemaValidator_1.schemaValidator)(auth_1.signUpSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.categoryListForUser(req.body, req.headers);
    return res.status(CREATED).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
/**
 * Explore list for users
 */
router.post(exports.p.exploreListForUser, (0, schemaValidator_1.schemaValidator)(auth_1.accountVerificationSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.exploreListForUser(req.body, req.headers);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success, result: data });
}));
// Export default
exports.default = router;
