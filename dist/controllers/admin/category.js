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
const category_1 = __importDefault(require("../../models/category"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
/**
* List Category
*
* @query body
* @returns
*/
function listCat(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10 } = body;
            const totalCount = yield category_1.default.countDocuments({ isDelete: false });
            const data = yield category_1.default.find({ isDelete: false }).sort({ createdAt: -1 }).skip((perPage * page) - perPage).limit(perPage);
            resolve({ data, totalCount: totalCount });
        }
        catch (err) {
            reject(err);
        }
    }));
}
function getCat(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { catId } = query;
            if (!catId) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryIdRequired, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const data = yield category_1.default.findOne({ isDelete: false, _id: catId });
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
* Add Category
*
* @body body
* @returns
*/
function addCat(body, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!image) {
                reject(new errors_1.CustomError('Image required', http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const { name, meso_name } = body;
            const lower_name = name.toLowerCase();
            const meso_lower_name = meso_name.toLowerCase();
            const obj = Object.assign(Object.assign({}, body), { lower_name,
                meso_lower_name, image: image.path ? image.path : '' });
            const check = yield category_1.default.findOne({ lower_name: lower_name });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace(`{{catName}}`, name), http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const checkMeso_name = yield category_1.default.findOne({ meso_lower_name: meso_lower_name });
                if (checkMeso_name) {
                    reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace(`{{catName}}`, meso_name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                else {
                    const add = yield category_1.default.create(obj);
                    resolve(add);
                }
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
/***
 * @query body
 * @returns
 */
function editCat(body, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, meso_name, catId } = body;
            const lower_name = name.toLowerCase();
            const meso_lower_name = meso_name.toLowerCase();
            const obj = Object.assign(Object.assign({}, body), { lower_name,
                meso_lower_name });
            const check = yield category_1.default.findById({ _id: catId, isDelete: false });
            if (image) {
                obj.image = image.path;
            }
            else {
                obj.image = check.image;
            }
            if (check) {
                const checkCatName = yield category_1.default.findOne({ lower_name: lower_name, isDelete: false });
                if (checkCatName) {
                    if ((checkCatName._id).toString() == catId) {
                        const checkCat_mesoName = yield category_1.default.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                        if (checkCat_mesoName) {
                            if ((checkCat_mesoName._id).toString() == catId) {
                                yield category_1.default.updateOne({ _id: catId }, obj);
                                resolve({ success: true });
                            }
                            else {
                                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace(`{{catName}}`, meso_name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                            }
                        }
                        else {
                            yield category_1.default.updateOne({ _id: catId }, obj);
                            resolve({ success: true });
                        }
                    }
                    else {
                        reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace(`{{catName}}`, name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                    }
                }
                else {
                    const checkCat_mesoName = yield category_1.default.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                    if (checkCat_mesoName) {
                        if ((checkCat_mesoName._id).toString() == catId) {
                            yield category_1.default.updateOne({ _id: catId }, obj);
                            resolve({ success: true });
                        }
                        else {
                            reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace(`{{catName}}`, meso_name), http_status_codes_1.StatusCodes.BAD_REQUEST));
                        }
                    }
                    else {
                        yield category_1.default.updateOne({ _id: catId }, obj);
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
function updateStatus(query, catId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!catId.id) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryIdRequired, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            if (!query.isActive) {
                reject(new errors_1.CustomError(_constants_1.errors.en.isActiveRequired, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const check = yield category_1.default.findOne({ _id: catId.id, isDelete: false });
            if (check) {
                yield category_1.default.updateOne({ _id: catId.id }, { isActive: query.isActive });
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
function deleteCat(catId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const check = yield category_1.default.findOne({ _id: catId.id, isDelete: false });
            if (check) {
                yield category_1.default.updateOne({ _id: catId.id }, { isDelete: true });
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
    listCat,
    getCat,
    addCat,
    editCat,
    updateStatus,
    deleteCat
};
