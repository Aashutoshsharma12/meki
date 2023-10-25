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
const order_1 = __importDefault(require("../../models/order"));
const users_1 = __importDefault(require("../../models/users"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
function user_orderList(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = query;
            if (!userId) {
                reject(new errors_1.CustomError("UserId required", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const [details, orderDetails, count] = yield Promise.all([users_1.default.findOne({ _id: userId }, { name: 1, email: 1, phoneNumber: 1, countryCode: 1, image: 1 }), order_1.default.find({ userId: userId }).sort({ createdAt: 1 }), order_1.default.countDocuments({ userId: userId })]);
                resolve({ userDetails: details, orderDetails: orderDetails, count: count });
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
exports.default = {
    user_orderList
};
