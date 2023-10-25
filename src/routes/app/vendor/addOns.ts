import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import addOnsController from '@controllers/vendor/addOns';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemAddOns: '/AddItemAddOns',
    getAddOnsByVendor: '/getAddOnsByVendor',
    EditItemAddOnsByVendor: '/EditItemAddOnsByVendor',
    getItemAddOnsDetails: '/getItemAddOnsDetails',
    ActiveDeactiveItemAddOns : '/ActiveDeactiveItemAddOns',
    DeleteItemAddOns: '/DeleteItemAddOns'
} as const;

/**
 * Add Item AddOns
 */
router.post(p.AddItemAddOns, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsController.AddItemAddOns(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get Item AddOns
 */
router.post(p.getAddOnsByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsController.getAddOnsByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Edit Item AddOns
 */
router.post(p.EditItemAddOnsByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsController.EditItemAddOnsByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get Item AddOns details
 */
router.post(p.getItemAddOnsDetails, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsController.getItemAddOnsDetails(req.body, req.vendor.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update Item AddOns status
 */
router.post(p.ActiveDeactiveItemAddOns, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsController.ActiveDeactiveItemAddOns(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Delete Item AddOns
 */
router.post(p.DeleteItemAddOns, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsController.DeleteItemAddOns(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
