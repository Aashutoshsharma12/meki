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
const _Custom_message_1 = require("../../Custom_message/index");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Vendor open closing
 *
 * @param
 * @returns
 */
// Add/Edit opening closing time
function AddVendorOpenClosing(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var open_closing = yield index_1.open_closingModel.findOne({ 'vendorId': userId });
            if (open_closing) {
                var updateobj = {
                    'sunday': data.sunday ? data.sunday : open_closing.sunday,
                    'monday': data.monday ? data.monday : open_closing.monday,
                    'tuesday': data.tuesday ? data.tuesday : open_closing.tuesday,
                    'wednesday': data.wednesday ? data.wednesday : open_closing.wednesday,
                    'thursday': data.thursday ? data.thursday : open_closing.thursday,
                    'friday': data.friday ? data.friday : open_closing.friday,
                    'saturday': data.saturday ? data.saturday : open_closing.saturday,
                };
                yield open_closing.updateOne({ 'vendorId': userId }, updateobj);
                var open_closeData = yield index_1.open_closingModel.findOne({ 'vendorId': userId });
                resolve({ result: open_closeData });
            }
            else {
                var obj = {
                    'vendorId': userId,
                    'sunday': data.sunday ? data.sunday : { 'open': '00:00 AM', 'close': "00:00 AM", status: false },
                    'monday': data.monday ? data.monday : { 'open': '00:00 AM', 'close': "00:00 AM", status: false },
                    'tuesday': data.tuesday ? data.tuesday : { 'open': '00:00 AM', 'close': "00:00 AM", status: false },
                    'wednesday': data.wednesday ? data.wednesday : { 'open': '00:00 AM', 'close': "00:00 AM", status: false },
                    'thursday': data.thursday ? data.thursday : { 'open': '00:00 AM', 'close': "00:00 AM", status: false },
                    'friday': data.friday ? data.friday : { 'open': '00:00 AM', 'close': "00:00 AM", status: false },
                    'saturday': data.saturday ? data.saturday : { 'open': '00:00 AM', 'close': "00:00 AM", status: false },
                };
                var time = yield new index_1.open_closingModel(obj).save();
                resolve({ result: time });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Get vendor open closing time
function getVendorOpenClosing(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var open_closing = yield index_1.open_closingModel.findOne({ 'vendorId': userId });
            if (open_closing) {
                resolve({ result: open_closing });
            }
            else {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Get open closing details
function getOpenCloseDetail(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var day = data.day;
            if (!userId || !data.day) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var openClose = yield index_1.open_closingModel.findOne({ 'vendorId': userId }, { day: 1 });
            if (openClose) {
                resolve({ result: openClose });
            }
            else {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Delete open close
function deleteOpenClose(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var day = data.day;
            if (!userId || !day) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var openClose = yield index_1.open_closingModel.updateOne({ 'vendorId': userId }, { day: {} });
            var openCloseData = yield index_1.open_closingModel.findOne({ 'vendorId': userId });
            if (openCloseData) {
                resolve({ result: openCloseData });
            }
            else {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Export default
exports.default = {
    AddVendorOpenClosing,
    getVendorOpenClosing,
    getOpenCloseDetail,
    deleteOpenClose
};
