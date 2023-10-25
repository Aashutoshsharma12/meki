import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import addOnsCategoryController from '@controllers/vendor/addOns_category';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemAddOnsCategory: '/AddItemAddOnsCategory',
    getAddOns_CategoryByVendor: '/getAddOns_CategoryByVendor',
    EditItemAddOnsCategoryByVendor: '/EditItemAddOnsCategoryByVendor',
    getItemAddOnsCategoryDetails: '/getItemAddOnsCategoryDetails',
    ActiveDeactiveItemAddOnsCategory : '/ActiveDeactiveItemAddOnsCategory'
} as const;

/**
 * Add Item AddOns Category
 */
router.post(p.AddItemAddOnsCategory, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.AddItemAddOnsCategory(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get Item AddOns Category
 */
router.post(p.getAddOns_CategoryByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.getAddOns_CategoryByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Edit Item AddOns Category
 */
router.post(p.EditItemAddOnsCategoryByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.EditItemAddOnsCategoryByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get Item AddOns Category details
 */
router.post(p.getItemAddOnsCategoryDetails, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.getItemAddOnsCategoryDetails(req.body, req.vendor.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update Item AddOns Category status
 */
router.post(p.ActiveDeactiveItemAddOnsCategory, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.ActiveDeactiveItemAddOnsCategory(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
