import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import feedbackController from '@controllers/user/feedback';
import {schemaValidator} from '@utils/schemaValidator';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { registerAddressSchema } from "@validators/user";
import { success } from '@constants';


// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    sendFeedBack: '/sendFeedBack',
    getFeedback:'/getFeedback'

} as const;

/**
 * Send feedback
 */
router.post(p.sendFeedBack,verifyAuthToken, async (req: any, res: Response) => {
    const data = await feedbackController.sendFeedBack(req.body ,req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get feedback
 */
router.post(p.getFeedback,verifyAuthToken, async (req: any, res: Response) => {
    const data = await feedbackController.getFeedback(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
