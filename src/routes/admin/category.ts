import { checkRole, verifyAuthToken } from "@utils/authValidator";
import categoryController from '../../controllers/admin/category'
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { success } from "@constants";
import { schemaValidator, schemaValidator1 } from "@utils/schemaValidator";
import { addCat, editCat } from "@validators/category";
import { Request, Response } from "express";
import upload from "@utils/multer";
const router = Router();
const { OK, CREATED } = StatusCodes
export const p = {
    list: '/list',
    add: '/add',
    edit: '/edit',
    get: '/get',
    updateStatus: '/updateStatus/:id',
    delete: '/delete/:id'
} as const

router.get(p.list, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await categoryController.listCat(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
});

router.post(p.add, verifyAuthToken, checkRole(['Admin']), schemaValidator1(addCat),upload.single('image'), async (req: any, res: Response) => {
    const data = await categoryController.addCat(req.query,req.file);
    return res.status(CREATED).json({ message: success.en.categoryAdded, code: CREATED, data })
})

router.put(p.edit, verifyAuthToken, checkRole(['Admin']), schemaValidator1(editCat), upload.single('image'), async (req: any, res) => {
    // console.log(req.file?.image,"lldldd",req.file)
    const data = await categoryController.editCat(req.query, req.file);
    return res.status(CREATED).json({ message: success.en.updateSuccefully, code: CREATED, data })
})

router.get(p.get, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await categoryController.getCat(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
})

router.put(p.updateStatus, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await categoryController.updateStatus(req.query, req.params);
    return res.status(OK).json({ message: success.en.updateSuccefully, code: OK, data })
})

router.delete(p.delete, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await categoryController.deleteCat(req.params);
    return res.status(OK).json({ message: success.en.updateSuccefully, code: OK, data })
})

export default router;
