import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import faqController from '@controllers/user/faq';
import {schemaValidator} from '@utils/schemaValidator';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { registerAddressSchema } from "@validators/user";
import { success } from '@constants';


// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    getFaqCatList: '/getFaqCatList',
    getFaqs:'/getFaqs'

} as const;

/**
 * Get faq category list
 */
router.post(p.getFaqCatList,verifyAuthToken, async (req: any, res: Response) => {
    const data = await faqController.getFaqCatList(req.body ,req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get faqs
 */
router.post(p.getFaqs,verifyAuthToken, async (req: any, res: Response) => {
    const data = await faqController.getFaqs(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
