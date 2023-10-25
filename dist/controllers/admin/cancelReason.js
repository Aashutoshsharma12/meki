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
const _constants_1 = require("../../constants/index");
const cancelReason_1 = __importDefault(require("../../models/cancelReason"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
function addReason(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { reason, meso_reason } = body;
            const check = yield cancelReason_1.default.findOne({ $or: [{ lower_reason: reason.toLowerCase() }, { meso_lower_reason: meso_reason.toLowerCase() }], isDelete: false });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.reasonExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const obj = Object.assign(Object.assign({}, body), { lower_reason: reason.toLowerCase(), meso_lower_reason: meso_reason.toLowerCase() });
                const add = yield cancelReason_1.default.create(obj);
                resolve(add);
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function editReason(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { reason, meso_reason, cancelReasonId } = body;
            const check = yield cancelReason_1.default.findOne({ _id: { $ne: cancelReasonId }, $or: [{ lower_reason: reason.toLowerCase() }, { meso_lower_reason: meso_reason.toLowerCase() }], isDelete: false });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.reasonExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const obj = Object.assign(Object.assign({}, body), { lower_reason: reason.toLowerCase(), meso_lower_reason: meso_reason.toLowerCase() });
                yield cancelReason_1.default.updateOne({ _id: cancelReasonId }, obj);
                resolve({ success: true });
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function getReason(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { cancelReasonId } = query;
            const check = yield cancelReason_1.default.findOne({ isDelete: false, _id: cancelReasonId });
            if (check) {
                resolve(check);
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function listReason(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10, search } = query;
            let obj = {
                isDelete: false
            };
            if (search) {
                obj = Object.assign(Object.assign({}, obj), { $or: [
                        { reason: { $regex: search, $options: 'i' } },
                        { meso_reason: { $regex: search, $options: 'i' } }
                    ] });
            }
            const count = yield cancelReason_1.default.countDocuments(obj);
            const check = yield cancelReason_1.default.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            resolve({ check, count: count });
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function deleteReason(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { cancelReasonId } = query;
            const check = yield cancelReason_1.default.findOne({ isDelete: false, _id: cancelReasonId });
            if (check) {
                yield cancelReason_1.default.updateOne({ _id: cancelReasonId }, { isDelete: true });
                resolve({ success: true });
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
exports.default = {
    addReason,
    editReason,
    getReason,
    listReason,
    deleteReason
};
