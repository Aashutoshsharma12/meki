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
exports.p = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const item_1 = __importDefault(require("../../controllers/admin/item"));
const authValidator_1 = require("../../utils/authValidator");
const _constants_1 = require("../../constants/index");
const multer_1 = __importDefault(require("../../utils/multer"));
const schemaValidator_1 = require("../../utils/schemaValidator");
const menuItem_1 = require("../../validators/menuItem");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    AddItem: '/AddItem',
    // getItem: '/getItem',
    EditItem: '/EditItem',
    getItemDetails: '/getItemDetails',
    DeleteItemMenu: '/DeleteItemMenu',
    catList: '/catList'
};
/**
 * Add Item
 */
router.post(exports.p.AddItem, multer_1.default.fields([{ name: "image", maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(menuItem_1.addItem), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield item_1.default.AddItem(req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image);
    return res.status(CREATED).send({ data, code: CREATED, message: _constants_1.success.en.success });
}));
// /**
//  * Add Item
//  */
// router.post(p.AddItem, upload1.single('image'), upload_stream, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
//     // sharp(req.file.buffer)
//     //     .resize(200, 100)
//     //     .toFile('output.jpg', (err, info) => {
//     //         if (err) {
//     //             console.error(err);
//     //         } else {
//     //             console.log(info, "sslslslsls")
//     //         }
//     //     });
//     const data = await itemController.AddItem(req.body, req.files?.image);
//     return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
// });
// /**
//  * Get Item
//  */
// router.get(p.getItem, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
//     const data = await itemController.getItem(req.query);
//     return res.status(OK).send({ data, code: OK, message: success.en.success});
// });
/**
 * Edit Item
 */
router.put(exports.p.EditItem, multer_1.default.fields([{ name: "image", maxCount: 1 }]), authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (0, schemaValidator_1.schemaValidator)(menuItem_1.editItem), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = yield item_1.default.EditItem(req.body, (_b = req.files) === null || _b === void 0 ? void 0 : _b.image);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Get Item details
 */
router.get(exports.p.getItemDetails, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.getItemDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * Delete Item
 */
router.delete(exports.p.DeleteItemMenu, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.DeleteItemMenu(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
/**
 * List ItemCategory
 */
router.get(exports.p.catList, authValidator_1.verifyAuthToken, (0, authValidator_1.checkRole)(['Admin']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield item_1.default.ItemCategoryList(req.query);
    return res.status(OK).send({ data, code: OK, message: _constants_1.success.en.success });
}));
// Export default
exports.default = router;
