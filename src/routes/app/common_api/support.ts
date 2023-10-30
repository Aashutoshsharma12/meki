import { Router } from "express";
import supportController from '@controllers/common_api/support';
import { StatusCodes } from "http-status-codes";
import { checkRole, verifyAuthToken } from "@utils/authValidator";
import { schemaValidator, schemaValidator1 } from "@utils/schemaValidator";
import { success } from "@constants";
import { addFaq, createReport, editFaq, get, getDetails } from "@validators/faq";
const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    createReport: '/createReport',
    edit: '/edit',
    get: '/get',
    list: '/list',
    updateStatus: '/updateStatus'
} as const;

router.post(p.createReport, verifyAuthToken, checkRole(['vendor', 'user', 'deliveryPerson']), schemaValidator(createReport), async (req, res) => {
    const data = await supportController.createReport(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success })
});

router.get(p.get, verifyAuthToken, checkRole(['Admin']), schemaValidator1(get), async (req, res) => {
    const data = await supportController.getDetails(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.get(p.list, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await supportController.list(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.get(p.updateStatus, verifyAuthToken, checkRole(['Admin']), schemaValidator1(get), async (req, res) => {
    const data = await supportController.updateStatus(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.success })
});


export default router;