import { checkRole, verifyAuthToken } from "@utils/authValidator";
import cancelReasonController from '../../controllers/admin/cancelReason'
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { success } from "@constants";
import { schemaValidator, schemaValidator1 } from "@utils/schemaValidator";
import { addExplore, editExplore } from "@validators/category";
import { Request, Response } from "express";
import upload from "@utils/multer";
import { addCancelReason, editCancelReason, getReason } from "@validators/cancelReason";
const router = Router();
const { OK, CREATED } = StatusCodes
export const p = {
    list: '/list',
    add: '/add',
    edit: '/edit',
    get: '/get',
    delete: '/delete'
} as const

router.get(p.list, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await cancelReasonController.listReason(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
});

router.post(p.add, verifyAuthToken, checkRole(['Admin']), schemaValidator(addCancelReason), async (req: any, res) => {
    const data = await cancelReasonController.addReason(req.body);
    return res.status(CREATED).json({ message: success.en.success, code: CREATED, data })
});

router.put(p.edit, verifyAuthToken, checkRole(['Admin']), schemaValidator(editCancelReason), async (req: any, res) => {
    const data = await cancelReasonController.editReason(req.body);
    return res.status(CREATED).json({ message: success.en.updateSuccefully, code: CREATED, data })
})

router.get(p.get, verifyAuthToken, checkRole(['Admin']), schemaValidator1(getReason), async (req, res) => {
    const data = await cancelReasonController.getReason(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
})

router.delete(p.delete, verifyAuthToken, checkRole(['Admin']), schemaValidator1(getReason), async (req, res) => {
    const data = await cancelReasonController.deleteReason(req.query);
    return res.status(OK).json({ message: success.en.success, code: OK, data })
})

export default router;
