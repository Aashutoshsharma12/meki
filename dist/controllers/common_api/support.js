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
const supportModel_1 = __importDefault(require("../../models/supportModel"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
function createReport(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { message, addBy, Id } = body;
            if (addBy == 'deliveryPerson') {
                body.deliveryPersonId = Id;
            }
            else {
                body.userId = Id;
            }
            console.log(body, "Dd;d");
            const add = yield supportModel_1.default.create(body);
            resolve(add);
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function getDetails(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const details = yield supportModel_1.default.findOne({ _id: query.reportId, isDelete: false });
            if (!details) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                resolve(details);
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function list(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { status, search, page = 1, perPage = 10 } = query;
            let obj = {
                isDelete: false
            };
            if (search) {
                obj = Object.assign(Object.assign({}, obj), { $or: [
                        { message: { $regex: search, $options: 'i' } },
                        { 'UserDetails.name': { $regex: search, $options: 'i' } },
                        { 'UserDetails.email': { $regex: search, $options: 'i' } },
                        { 'UserDetails.phoneNumber': { $regex: search, $options: 'i' } },
                        { 'deliveryPersonDetails.name': { $regex: search, $options: 'i' } },
                        { 'deliveryPersonDetails.phoneNumber': { $regex: search, $options: 'i' } },
                        { 'deliveryPersonDetails.email': { $regex: search, $options: 'i' } }
                    ] });
            }
            if (status) {
                obj = Object.assign(Object.assign({}, obj), { status: status });
            }
            const count1 = yield supportModel_1.default.aggregate([
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'userId',
                        as: 'UserDetails',
                        from: 'users',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'deliveryPersonId',
                        as: 'deliveryPersonDetails',
                        from: 'deliverypersons',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                { $match: obj },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 }, // Use $sum to count the documents
                    },
                }
            ]);
            if (count1.length) {
                var count = count1[0].count;
            }
            else {
                var count = 0;
            }
            const list = yield supportModel_1.default.aggregate([
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'userId',
                        as: 'UserDetails',
                        from: 'users',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'deliveryPersonId',
                        as: 'deliveryPersonDetails',
                        from: 'deliverypersons',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                { $match: obj },
                { $sort: { createdAt: -1 } },
                { $skip: Number(page * perPage) - Number(perPage) },
                { $limit: Number(perPage) }
            ]);
            resolve({ list, count: count });
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function updateStatus(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { reportId } = query;
            const check = yield supportModel_1.default.findOne({ _id: reportId, isDelete: false });
            if (check) {
                if (check.status == 'Open') {
                    yield supportModel_1.default.updateOne({ _id: reportId }, { status: 'Closed' });
                    resolve({ success: true });
                }
                else {
                    yield supportModel_1.default.updateOne({ _id: reportId }, { status: "Open" });
                    resolve({ success: true });
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
exports.default = {
    createReport,
    getDetails,
    list,
    updateStatus
};
