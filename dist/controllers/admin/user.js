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
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const _constants_1 = require("../../constants/index");
const _Custom_message_1 = require("../../Custom_message/index");
const ObjectId = mongoose_1.default.Types.ObjectId;
/**
 * User register
 *
 * @param body
 * @returns
 */
//***********Edit Vendor Profile*********/
function editVendor(body, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { countryCode, phoneNumber } = body;
            const userData = yield index_1.userModel.findOne({ countryCode: countryCode, phoneNumber: phoneNumber, isDelete: false, _id: { $ne: body.vendorId } });
            if (userData) {
                reject(new errors_1.CustomError(_constants_1.errors.en.accountAlreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                if (image) {
                    body = Object.assign(Object.assign({}, body), { image: image[0].path });
                }
                yield index_1.userModel.updateOne({ _id: body.vendorId }, body, { new: true });
                resolve({ success: true });
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
//****Users List****/
function getUsers(query, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const { page = 1, perPage = 10, search, status } = query;
            let condition = {
                isDelete: false, role: "user"
            };
            if (search && search != '') {
                condition = Object.assign(Object.assign({}, condition), { $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } },
                    ] });
            }
            ;
            if (status) {
                condition = Object.assign(Object.assign({}, condition), { isActive: status });
            }
            ;
            // if already into array not push and not then push
            // await userModel.updateOne({ _id: "65117596a7a675b2967ead65" }, { $addToSet: { itemId: new ObjectId("6528d808521323b339fdfcf1") } })
            //remove from array using query
            // await userModel.updateOne({ _id: "65117596a7a675b2967ead65" }, { $pull: { itemId: new ObjectId("6528d808521323b339fdfcf1") } })
            //Increment and Decrement key value using query
            // await userModel.updateOne({ _id: "65117596a7a675b2967ead65" }, { $inc: { totalBranch:1} })
            const response = yield index_1.userModel.find(condition, { name: 1, isActive: 1, isDelete: 1, createdAt: 1, email: 1, phoneNumber: 1, role: 1 }).skip(Number(page - 1) * Number(perPage))
                .limit(Number(perPage)).sort({ createdAt: -1 });
            const count = yield index_1.userModel.count(condition);
            resolve({ response, count, });
        }
        catch (err) {
            reject(err);
        }
    }));
}
//****User Detail By Id*****/
function userProfile(userId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield index_1.userModel.findOne({ "_id": userId });
            if (!response) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                resolve(response);
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
//***** Delete Category*****/
function deleteUser(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = body;
            if (!userId) {
                reject(new errors_1.CustomError('UserId required', http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                const userData = yield index_1.userModel.findOne({ _id: userId });
                if (!userData) {
                    reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
                }
                else {
                    yield index_1.userModel.updateOne({ _id: userId }, { isDelete: true }, { new: true });
                    resolve({ success: true });
                }
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
//*********Vendor Status Change****** */
function vendorStatus(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { status, vendorId } = query;
            if (!status) {
                reject(new errors_1.CustomError('Status Required', http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                const userData = yield index_1.userModel.findOne({ _id: vendorId });
                if (!userData) {
                    reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
                }
                else {
                    yield index_1.userModel.updateOne({ _id: vendorId }, { vendor_status: status });
                    resolve({ success: true });
                }
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
//****User List for Excel data Export *****/
function userExcelList() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let condition = {
                isDelete: false,
                role: "user"
            };
            let response1 = yield index_1.userModel.find(condition, { name: 1, email: 1, countryCode: 1, phoneNumber: 1 }).sort({ createdAt: -1 });
            let response = response1.map(user => {
                return {
                    identity: user._id ? user._id : "N/A", name: user.name ? user.name : "N/A", email: user.email ? user.email : "N/A", countryCode: user.countryCode ? user.countryCode : "N/A", phoneNumber: user.phoneNumber ? user.phoneNumber : "N/A",
                };
            });
            if (!response) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                resolve(response);
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
//vendor list
function vendorList(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10, search, status } = query;
            let condition = {
                isDelete: false, branchType: 'Main', role: "vendor"
            };
            if (search && search != '') {
                condition = Object.assign(Object.assign({}, condition), { $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } },
                    ] });
            }
            ;
            if (status) {
                condition = Object.assign(Object.assign({}, condition), { vendor_status: status });
            }
            ;
            const response = yield index_1.userModel.find(condition, { branchNo: 1, vendor_status: 1, name: 1, isActive: 1, isDelete: 1, image: 1, restaurantName: 1, phoneNumber: 1, role: 1, countryCode: 1 }).skip(Number(page - 1) * Number(perPage))
                .limit(Number(perPage)).sort({ createdAt: -1 });
            const count = yield index_1.userModel.count(condition);
            resolve({ response, count, });
        }
        catch (err) {
            reject(err);
        }
    }));
}
//vendorDetails
function vendorDetails(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { vendorId } = query;
            if (!vendorId) {
                reject(new errors_1.CustomError("VendorId required", http_status_codes_1.default.BAD_REQUEST));
            }
            ;
            const profile_details = yield index_1.userModel.findOne({ _id: vendorId });
            resolve({ profile_details: profile_details });
        }
        catch (err) {
            reject(err);
        }
    }));
}
// Export default
exports.default = {
    editVendor,
    getUsers,
    userProfile,
    vendorStatus,
    deleteUser,
    userExcelList,
    vendorList,
    vendorDetails
};
