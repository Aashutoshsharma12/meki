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
const deliveryPerson_1 = __importDefault(require("../../models/deliveryPerson"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
function addDeliveryPerson(body, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!image) {
                reject(new errors_1.CustomError('Image Required', http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const { phoneNumber, countryCode } = body;
                const check = yield deliveryPerson_1.default.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false });
                if (check) {
                    reject(new errors_1.CustomError(_constants_1.errors.en.accountAlreadyExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                else {
                    const obj = Object.assign(Object.assign({}, body), { image: image[0].path });
                    const add = yield deliveryPerson_1.default.create(obj);
                    resolve(add);
                }
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function editDeliveryPerson(body, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { phoneNumber, countryCode, delivery_personId } = body;
            const check1 = yield deliveryPerson_1.default.findOne({ isDelete: false, _id: delivery_personId });
            if (check1) {
                const check = yield deliveryPerson_1.default.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false, _id: { $ne: delivery_personId } });
                if (check) {
                    reject(new errors_1.CustomError(_constants_1.errors.en.accountAlreadyExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                else {
                    if (!image) {
                        var newImage = check1.image;
                    }
                    else {
                        var newImage = image[0].path;
                    }
                    const obj = Object.assign(Object.assign({}, body), { image: newImage });
                    const add = yield deliveryPerson_1.default.updateOne({ _id: delivery_personId }, obj);
                    resolve(add);
                }
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
function getDeliveryPerson(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { delivery_personId } = query;
            const check = yield deliveryPerson_1.default.findOne({ isDelete: false, _id: delivery_personId });
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
function listDeliveryPerson(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10, search, status } = query;
            let obj = {
                isDelete: false
            };
            if (search) {
                obj = Object.assign(Object.assign({}, obj), { $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } }
                    ] });
            }
            if (status) {
                obj = Object.assign(Object.assign({}, obj), { status: status });
            }
            const count = yield deliveryPerson_1.default.countDocuments(obj);
            const check = yield deliveryPerson_1.default.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            resolve({ check, count: count });
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function deleteDeliveryPerson(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { delivery_personId } = query;
            const check = yield deliveryPerson_1.default.findOne({ isDelete: false, _id: delivery_personId });
            if (check) {
                yield deliveryPerson_1.default.updateOne({ _id: delivery_personId }, { isDelete: true });
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
    addDeliveryPerson,
    editDeliveryPerson,
    getDeliveryPerson,
    listDeliveryPerson,
    deleteDeliveryPerson
};
