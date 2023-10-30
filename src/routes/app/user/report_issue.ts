import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import report_issueController from '@controllers/user/report_issue';
import {schemaValidator} from '@utils/schemaValidator';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { registerAddressSchema } from "@validators/user";
import { success } from '@constants';
import upload from '@utils/multer';


// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    addReportAndIssue: '/addReportAndIssue',
    getReportAndIssueByUser:'/getReportAndIssueByUser',
    getReportAndIssueDetails:'/getReportAndIssueDetails',
    getReportAndIssueMessage:'/getReportAndIssueMessage'
} as const;

/**
 * Get faq category list
 */
router.post(p.addReportAndIssue,upload.fields([{name:"image",maxCount:1}]),verifyAuthToken, async (req: any, res: Response) => {
    const data = await report_issueController.addReportAndIssue(req.body ,req.user.id,req.files?.image,req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get faqs
 */
router.post(p.getReportAndIssueByUser,verifyAuthToken, async (req: any, res: Response) => {
    const data = await report_issueController.getReportAndIssueByUser(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get faqs
 */
router.post(p.getReportAndIssueDetails,verifyAuthToken, async (req: any, res: Response) => {
    const data = await report_issueController.getReportAndIssueDetails(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get faqs
 */
router.post(p.getReportAndIssueMessage,verifyAuthToken, async (req: any, res: Response) => {
    const data = await report_issueController.getReportAndIssueMessage(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
