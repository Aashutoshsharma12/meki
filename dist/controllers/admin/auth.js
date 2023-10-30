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
const index_1 = require("../../models/index");
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
const _Custom_message_1 = require("../../Custom_message/index");
/**
 * Admin registration
 *
 * @param admin
 * @returns
 */
function registerAdmin(admin, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const adminData = yield index_1.adminModel.findOne({ email: admin.email }).lean();
            if (adminData) {
                reject(new errors_1.CustomError(message.adminWithSameEmail.replace('{{email}}', admin.email), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                const pass = bcrypt_1.default.hashSync(admin.password, 10);
                admin.password = pass;
                const response = yield index_1.adminModel.create(admin);
                resolve(response);
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.adminWithSameEmail, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Admin Login 
function login(body, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = body;
            const { language } = header;
            const message = (0, _Custom_message_1.messages)(language);
            const adminData = yield index_1.adminModel.findOne({ email }, { name: 1, token: 1, email: 1, role: 1, password: 1 });
            if (!adminData) {
                reject(new errors_1.CustomError(message.noSuchAccount, http_status_codes_1.default.NOT_FOUND));
            }
            var match = bcrypt_1.default.compareSync(password, adminData.password);
            if (match == false) {
                reject(new errors_1.CustomError(message.WrongPassword, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                const data = {
                    id: adminData.id,
                    role: 'Admin'
                };
                const jti = "unique-jti";
                const token = jwt.sign(Object.assign(Object.assign({}, data), { jti }), process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' });
                adminData.set({ token: token });
                yield adminData.save();
                adminData.password = undefined;
                adminData.updatedAt = undefined;
                // if (fcmToken && fcmToken != "") {
                //     let oldTokens = adminData?.fcmTokens ? adminData.fcmTokens : []
                //     oldTokens.push(fcmToken)
                //     adminData.set({ fcmTokens: oldTokens })
                //     adminData.save()
                // }
                resolve(adminData);
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
//*********Change Password********* */
function changePassword(body, adminId, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { password, newPassword } = body;
            const { language } = header;
            const message = (0, _Custom_message_1.messages)(language);
            const newPass = bcrypt_1.default.hashSync(newPassword, 10);
            const admin = yield index_1.adminModel.findOne({ _id: adminId }, { _id: 1, password: 1 });
            if (!admin) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                const isMatch = yield bcrypt_1.default.compare(password, admin.password);
                if (isMatch) {
                    yield index_1.adminModel.updateOne({ _id: admin._id }, { password: newPass }, { new: true });
                    resolve({ status: true });
                }
                else {
                    reject(new errors_1.CustomError(message.incorrectOldPass, http_status_codes_1.default.BAD_REQUEST));
                }
            }
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    }));
}
function logOut(headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = headers.authorization;
            yield index_1.adminModel.updateOne({ token: '' });
            resolve({ success: true });
        }
        catch (err) {
            reject(err);
        }
    }));
}
// Export default
exports.default = {
    registerAdmin,
    login,
    changePassword,
    logOut
};
