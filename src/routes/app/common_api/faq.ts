import { Router } from "express";
import faqController from '@controllers/common_api/faq';
import { StatusCodes } from "http-status-codes";
import { verifyAuthToken } from "@utils/authValidator";
import { schemaValidator, schemaValidator1 } from "@utils/schemaValidator";
import { success } from "@constants";
import { addFaq, editFaq, getDetails } from "@validators/faq";
const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    add: '/add',
    edit: '/edit',
    get: '/get',
    list: '/list',
    delete: '/delete'
} as const;

router.post('/add', verifyAuthToken, schemaValidator(addFaq), async (req, res) => {
    const data = await faqController.addFaq(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success })
});

router.put('/edit', verifyAuthToken, schemaValidator(editFaq), async (req, res) => {
    const data = await faqController.editFaq(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success })
});

router.get('/get', verifyAuthToken, schemaValidator1(getDetails), async (req, res) => {
    const data = await faqController.getDetails(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.get('/list', verifyAuthToken, async (req, res) => {
    const data = await faqController.list(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.delete('/delete', verifyAuthToken, schemaValidator1(getDetails), async (req, res) => {
    const data = await faqController.deleteFaq(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.success })
});


export default router;