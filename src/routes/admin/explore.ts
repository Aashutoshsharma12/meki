import { checkRole, verifyAuthToken } from "@utils/authValidator";
import exploreController from '../../controllers/admin/explore'
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { success } from "@constants";
import { schemaValidator, schemaValidator1 } from "@utils/schemaValidator";
import { addExplore, editExplore } from "@validators/category";
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
    const data = await exploreController.exploreList(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
});

router.post(p.add, verifyAuthToken, checkRole(['Admin']), schemaValidator1(addExplore), upload.fields([{ name: 'image1', maxCount: 1 }]), async (req: any, res) => {
    const data = await exploreController.addExplore(req.query, req.files?.image1);
    return res.status(CREATED).json({ message: success.en.exploreAdded, code: CREATED, data })
});

router.put(p.edit, verifyAuthToken, checkRole(['Admin']), schemaValidator1(editExplore),upload.fields([{name:"image",maxCount:1}]), async (req:any, res) => {
    const data = await exploreController.editExplore(req.query,req.files?.image);
    return res.status(CREATED).json({ message: success.en.updateSuccefully, code: CREATED, data })
})

router.get(p.get, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await exploreController.getExplore(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
})

router.put(p.updateStatus, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await exploreController.updateStatus(req.query, req.params);
    return res.status(OK).json({ message: success.en.updateSuccefully, code: OK, data })
})

router.delete(p.delete, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await exploreController.deleteExplore(req.params);
    return res.status(OK).json({ message: success.en.updateSuccefully, code: OK, data })
})

export default router;
