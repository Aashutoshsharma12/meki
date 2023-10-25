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
const notification_1 = __importDefault(require("../../models/notification"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
//Add and Send Notification
function sendNotification(body, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, meso_tittle, description, meso_description, sendDate, sendFrom, sendTo, sendTime } = body;
            const { timezone } = headers;
            console.log(timezone, "dldl", 'timezoneOffset');
            const obj = Object.assign(Object.assign({}, body), { sendDate: (0, moment_timezone_1.default)().tz(timezone).format('DD-MM-YYYY'), sendTime: (0, moment_timezone_1.default)().tz(timezone).format('HH:MM') });
            const add = yield notification_1.default.create(obj);
            resolve(add);
            if (add) {
                // Send Notification 
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
//Notification List
function notificationList(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10, sendTo } = query;
            const list = yield notification_1.default.find({ sendTo: sendTo }).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            const count = yield notification_1.default.countDocuments({ sendTo: sendTo });
            resolve({ list, count: count });
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
exports.default = {
    sendNotification,
    notificationList
};
