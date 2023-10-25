import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import deliveryPOrderController from '@controllers/vendor/deliveryPerson_order';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';
import upload from '@utils/multer';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    updateOrderStatusByDp: '/updateOrderStatusByDp',
    GetYesterdayEarningByDPerson: '/GetYesterdayEarningByDPerson',
    updateCollectItemStatusBydPerson: '/updateCollectItemStatusBydPerson',
    getDpExperienceMessage: '/getDpExperienceMessage',
    updateDpExpMessage: '/updateDpExpMessage',
    getOngoingOrderByDperson: '/getOngoingOrderByDperson',
    GetOrderListingBasedOnStatus: '/GetOrderListingBasedOnStatus',
    getOrderDetailsByDPerson: '/getOrderDetailsByDPerson'
} as const;

/**
 * Update order status by delivery person
 */
router.post(p.updateOrderStatusByDp, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.updateOrderStatusByDp(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get yesterday earning by delivery person
router.post(p.GetYesterdayEarningByDPerson, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.GetYesterdayEarningByDPerson(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Update item collect by delivery person
router.post(p.updateCollectItemStatusBydPerson, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.updateCollectItemStatusBydPerson(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get user experience message by delivery person
router.post(p.getDpExperienceMessage, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.getDpExperienceMessage(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Update experience message in order by delivery person
router.post(p.updateDpExpMessage, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.updateDpExpMessage(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get ongoing order for delivery person
router.post(p.getOngoingOrderByDperson, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.getOngoingOrderByDperson(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get order listing based on status
router.post(p.GetOrderListingBasedOnStatus, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.GetOrderListingBasedOnStatus(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get order details by delivery person
router.post(p.getOrderDetailsByDPerson, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryPOrderController.getOrderDetailsByDPerson(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Export default
export default router;
