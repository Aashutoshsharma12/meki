import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import addOnsCategoryController from '@controllers/admin/addons_Cat';
import { verifyAuthToken, checkRole } from "@utils/authValidator";
import { success } from '@constants';
import { schemaValidator } from '@utils/schemaValidator';
import { addaddons_cat, editaddons_cat } from '@validators/addons_cat';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemAddOnsCategory: '/add',
    listAddOns_Category: '/list',
    EditItemAddOnsCategory: '/edit',
    getItemAddOnsCategoryDetails: '/get',
} as const;

/**
 * Add Item AddOns Category
 */
router.post(p.AddItemAddOnsCategory, verifyAuthToken, checkRole(['Admin']), schemaValidator(addaddons_cat), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.AddItemAddOnsCategory(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
});

/**
 * List Item AddOns Category
 */
router.get(p.listAddOns_Category, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.listAddOns_Category(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Edit Item AddOns Category
 */
router.put(p.EditItemAddOnsCategory, verifyAuthToken, checkRole(['Admin']),schemaValidator(editaddons_cat), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.EditItemAddOnsCategory(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
});

/**
 * Get Item AddOns Category details
 */
router.get(p.getItemAddOnsCategoryDetails, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await addOnsCategoryController.getItemAddOnsCategoryDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

// Export default
export default router;
