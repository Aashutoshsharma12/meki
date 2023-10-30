import { Router } from "express";
import faqController from '@controllers/common_api/faq';
import { StatusCodes } from "http-status-codes";
import { checkRole, verifyAuthToken } from "@utils/authValidator";
import { schemaValidator, schemaValidator1 } from "@utils/schemaValidator";
import { success } from "@constants";
import { addFaq, addFaqCat, editFaq, editFaqCat, getDetails, getFaqCat } from "@validators/faq";
const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    add: '/add',
    edit: '/edit',
    get: '/get',
    list: '/list',
    delete: '/delete',
    addFaqCat:'/addFaqCat',
    editFaqCat:'/editFaqCat',
    getFaqCat:'/getFaqCat',
    faqCatList:'/faqCatList',
    deleteFaqCat:'/deleteFaqCat',
    all_faqCat:'/all_faqCat'
} as const;

router.post('/add', verifyAuthToken, checkRole(['Admin']), schemaValidator(addFaq), async (req, res) => {
    const data = await faqController.addFaq(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success })
});

router.put('/edit', verifyAuthToken, checkRole(['Admin']), schemaValidator(editFaq), async (req, res) => {
    const data = await faqController.editFaq(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success });
});

router.get('/get', verifyAuthToken, checkRole(['Admin']), schemaValidator1(getDetails), async (req, res) => {
    const data = await faqController.getDetails(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.get('/list', verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await faqController.list(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.delete('/delete', verifyAuthToken, checkRole(['Admin']), schemaValidator1(getDetails), async (req, res) => {
    const data = await faqController.deleteFaq(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.success })
});

//faq category
router.post('/addFaqCat', verifyAuthToken, checkRole(['Admin']), schemaValidator(addFaqCat), async (req, res) => {
    const data = await faqController.addFaqCat(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success })
});

router.put('/editFaqCat', verifyAuthToken, checkRole(['Admin']), schemaValidator(editFaqCat), async (req, res) => {
    const data = await faqController.editFaqCat(req.body);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success });
});

router.get('/getFaqCat', verifyAuthToken, checkRole(['Admin']), schemaValidator1(getFaqCat), async (req, res) => {
    const data = await faqController.getFaqCatDetails(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.get('/faqCatList', verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await faqController.faqCatList(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

router.delete('/deleteFaqCat', verifyAuthToken, checkRole(['Admin']), schemaValidator1(getFaqCat), async (req, res) => {
    const data = await faqController.deleteFaqCat(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.success })
});

router.get('/all_faqCat', verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await faqController.all_faqCat();
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});


export default router;