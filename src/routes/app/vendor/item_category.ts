import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import itemCategoryController from '@controllers/vendor/item_category';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemCategory: '/AddItemCategory',
    getItemCategoryByVendor: '/getItemCategoryByVendor',
    EditItemCategoryByVendor: '/EditItemCategoryByVendor',
    getItemCategoryDetails: '/getItemCategoryDetails',
    ActiveDeactiveItemCategory : '/ActiveDeactiveItemCategory'
} as const;

/**
 * Add Item Category
 */
router.post(p.AddItemCategory, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemCategoryController.AddItemCategory(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get Item Category
 */
router.post(p.getItemCategoryByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemCategoryController.getItemCategoryByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Edit Item Category
 */
router.post(p.EditItemCategoryByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemCategoryController.EditItemCategoryByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get Item Category details
 */
router.post(p.getItemCategoryDetails, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemCategoryController.getItemCategoryDetails(req.body, req.vendor.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update Item Category status
 */
router.post(p.ActiveDeactiveItemCategory, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemCategoryController.ActiveDeactiveItemCategory(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
