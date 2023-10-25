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
const explore_1 = __importDefault(require("../../models/explore"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
/**
* List Explore
*
* @query query
* @returns
*/
function exploreList(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10 } = query;
            console.log(page, perPage);
            const totalCount = yield explore_1.default.countDocuments({ isDelete: false });
            const data = yield explore_1.default.find({ isDelete: false }).sort({ position: 1 }).skip((perPage * page) - perPage).limit(perPage);
            resolve({ data, totalCount: totalCount });
        }
        catch (err) {
            reject(err);
        }
    }));
}
function getExplore(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { exploreId } = query;
            if (!exploreId) {
                reject(new errors_1.CustomError(_constants_1.errors.en.exploreIdRequired, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const data = yield explore_1.default.findOne({ isDelete: false, _id: exploreId });
            if (data)
                resolve(data);
            else
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        catch (err) {
            reject(err);
        }
    }));
}
/**
* Add Explore
*
* @query body
* @returns
*/
function addExplore(body, image1) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!image1) {
                reject(new errors_1.CustomError('Image required', http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const { name, image, meso_name } = body;
            const lower_name = name.toLowerCase();
            const meso_lower_name = meso_name.toLowerCase();
            const obj = Object.assign(Object.assign({}, body), { lower_name,
                meso_lower_name, image: image1[0].path });
            const check = yield explore_1.default.findOne({ lower_name: lower_name });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.exploreWithSameName.replace(`{{exploreName}}`, name), http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const checkMeso_name = yield explore_1.default.findOne({ meso_lower_name: meso_lower_name });
                if (checkMeso_name) {
                    reject(new errors_1.CustomError(_constants_1.errors.en.exploreWithSameName.replace(`{{exploreName}}`, meso_name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                else {
                    const add = yield explore_1.default.create(obj);
                    resolve(add);
                }
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
/**
* Edit Explore
*
* @query body
* @returns
*/
function editExplore(body, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, meso_name, exploreId } = body;
            const lower_name = name.toLowerCase();
            const meso_lower_name = meso_name.toLowerCase();
            const obj = Object.assign(Object.assign({}, body), { lower_name,
                meso_lower_name });
            const check = yield explore_1.default.findById({ _id: exploreId, isDelete: false });
            if (!image) {
                obj.image = check.image;
            }
            else {
                obj.image = image[0].path;
            }
            if (check) {
                const checkCatName = yield explore_1.default.findOne({ lower_name: lower_name, isDelete: false });
                if (checkCatName) {
                    if ((checkCatName._id).toString() == exploreId) {
                        const checkCat_mesoName = yield explore_1.default.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                        if (checkCat_mesoName) {
                            if ((checkCat_mesoName._id).toString() == exploreId) {
                                yield explore_1.default.updateOne({ _id: exploreId }, obj);
                                resolve({ success: true });
                            }
                            else {
                                reject(new errors_1.CustomError(_constants_1.errors.en.exploreWithSameName.replace(`{{exploreName}}`, meso_name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                            }
                        }
                        else {
                            yield explore_1.default.updateOne({ _id: exploreId }, obj);
                            resolve({ success: true });
                        }
                    }
                    else {
                        reject(new errors_1.CustomError(_constants_1.errors.en.exploreWithSameName.replace(`{{exploreName}}`, name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                    }
                }
                else {
                    const checkCat_mesoName = yield explore_1.default.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                    if (checkCat_mesoName) {
                        if ((checkCat_mesoName._id).toString() == exploreId) {
                            yield explore_1.default.updateOne({ _id: exploreId }, obj);
                            resolve({ success: true });
                        }
                        else {
                            reject(new errors_1.CustomError(_constants_1.errors.en.exploreWithSameName.replace(`{{exploreName}}`, meso_name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                        }
                    }
                    else {
                        yield explore_1.default.updateOne({ _id: exploreId }, obj);
                        resolve({ success: true });
                    }
                }
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function updateStatus(query, exploreId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!exploreId.id) {
                reject(new errors_1.CustomError(_constants_1.errors.en.exploreIdRequired, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            if (!query.isActive) {
                reject(new errors_1.CustomError(_constants_1.errors.en.isActiveRequired, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const check = yield explore_1.default.findOne({ _id: exploreId.id, isDelete: false });
            if (check) {
                yield explore_1.default.updateOne({ _id: exploreId.id }, { isActive: query.isActive });
                resolve({ success: true });
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function deleteExplore(exploreId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const check = yield explore_1.default.findOne({ _id: exploreId.id, isDelete: false });
            if (check) {
                yield explore_1.default.updateOne({ _id: exploreId.id }, { isDelete: true });
                resolve({ success: true });
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
exports.default = {
    exploreList,
    getExplore,
    addExplore,
    editExplore,
    updateStatus,
    deleteExplore
};
