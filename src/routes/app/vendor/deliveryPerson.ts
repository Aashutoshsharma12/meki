import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import deliveryBoyController from '@controllers/vendor/deliveryPerson';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';
import upload from '@utils/multer';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    deliveryBoyLogin: '/deliveryBoyLogin',
    checkAccount: '/checkAccount',
    logOut: '/logOut',
    EditDeliveryProfile: '/EditDeliveryProfile',
    UpdateStatusByDeliveryPerson: '/UpdateStatusByDeliveryPerson',
    UpdateNotificationStatusByDeliveryBoy: '/UpdateNotificationStatusByDeliveryBoy',
    UpdateLanguageByDeliveryBoy: '/UpdateLanguageByDeliveryBoy',
    UpdateLocationByDeliveryBoy: '/UpdateLocationByDeliveryBoy'
} as const;

/**
 * Login delivery boy
 */
router.post(p.deliveryBoyLogin,  async (req: any, res: Response) => {
    const data = await deliveryBoyController.deliveryBoyLogin(req.body, req.headers, req.ip);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Check delivery boy account
router.post(p.checkAccount, async (req: any, res: Response) => {
    const data = await deliveryBoyController.checkAccount(req.body, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Logout delivery boy
router.post(p.logOut, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryBoyController.logOut(req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Edit delivery boy profile
router.post(p.EditDeliveryProfile, verifyAuthToken, upload.fields([{name:"image",maxCount:1}]), async (req: any, res: Response) => {
    const data = await deliveryBoyController.EditDeliveryProfile(req.body,req.user.id,req.files?.image,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Update online status
router.post(p.UpdateStatusByDeliveryPerson, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryBoyController.UpdateStatusByDeliveryPerson(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Update notification status
router.post(p.UpdateNotificationStatusByDeliveryBoy, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryBoyController.UpdateNotificationStatusByDeliveryBoy(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Update language
router.post(p.UpdateLanguageByDeliveryBoy, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryBoyController.UpdateLanguageByDeliveryBoy(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Update location
router.post(p.UpdateLocationByDeliveryBoy, verifyAuthToken, async (req: any, res: Response) => {
    const data = await deliveryBoyController.UpdateLocationByDeliveryBoy(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Export default
export default router;
