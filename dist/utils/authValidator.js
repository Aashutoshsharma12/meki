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
exports.checkRole = exports.verifyAuthToken = void 0;
const jwt = require('jsonwebtoken');
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const index_1 = require("../models/index");
const _constants_1 = require("../constants/index");
const verifyAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
            error: _constants_1.errors.en.noToken,
            message: _constants_1.errors.en.noToken,
            code: http_status_codes_1.default.UNAUTHORIZED
        });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        if (verified.role == 'Admin') {
            req.user = verified;
            next();
            return;
        }
        //Note: Commented signle device login will uncomment before go live
        // const session:any = await userSessionModel.findOne({ jwtToken: token })
        // if(session.status) {
        const user = yield index_1.userModel.findOne({ _id: verified.id }, { isActive: 1 });
        if (user === null || user === void 0 ? void 0 : user.isActive) {
            req.user = verified;
            next();
        }
        else {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                error: _constants_1.errors.en.accountBlocked,
                message: _constants_1.errors.en.accountBlocked,
                code: http_status_codes_1.default.UNAUTHORIZED
            });
        }
        // } else {
        //     return res.status(StatusCodes.UNAUTHORIZED).json({
        //         error: errors.en.sessionExpired,
        //         message: errors.en.sessionExpired,
        //         code: StatusCodes.UNAUTHORIZED
        //     })
        // }
    }
    catch (err) {
        if (err.message == "jwt expired") {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                error: _constants_1.errors.en.sessionExpired,
                message: _constants_1.errors.en.sessionExpired,
                code: http_status_codes_1.default.UNAUTHORIZED
            });
        }
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
            error: _constants_1.errors.en.noToken,
            message: _constants_1.errors.en.noToken,
            code: http_status_codes_1.default.UNAUTHORIZED
        });
    }
});
exports.verifyAuthToken = verifyAuthToken;
const checkRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role))
            next();
        else {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                error: _constants_1.errors.en.unAuthRole,
                code: http_status_codes_1.default.UNAUTHORIZED
            });
        }
    };
};
exports.checkRole = checkRole;
