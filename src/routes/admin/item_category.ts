import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import itemCategoryController from '@controllers/admin/item_category';
import { verifyAuthToken, checkRole } from "@utils/authValidator";
import { success } from '@constants';
import { schemaValidator, schemaValidator1 } from '@utils/schemaValidator';
import { AddItemCategory, EditItemCategory, getItemCat, listItemCat } from '@validators/admin';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemCategory: '/AddItemCategory',
    ItemCategoryList: '/ItemCategoryList',
    EditItemCategory: '/EditItemCategory',
    getItemCategoryDetails: '/getItemCategoryDetails',
    deleteItemCategory: '/deleteItemCategory'
} as const;

/**
 * Add Item Category
 */
router.post(p.AddItemCategory, verifyAuthToken, checkRole(['Admin']), schemaValidator(AddItemCategory), async (req: any, res: Response) => {
    const data = await itemCategoryController.AddItemCategory(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
});

/**
 * List Item Category
 */
router.get(p.ItemCategoryList, verifyAuthToken, checkRole(['Admin']), schemaValidator1(listItemCat), async (req: any, res: Response) => {
    const data = await itemCategoryController.ItemCategoryList(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Edit Item Category
 */
router.put(p.EditItemCategory, verifyAuthToken, checkRole(['Admin']), schemaValidator(EditItemCategory), async (req: any, res: Response) => {
    const data = await itemCategoryController.EditItemCategory(req.body);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Get Item Category details
 */
router.get(p.getItemCategoryDetails, verifyAuthToken, checkRole(['Admin']), schemaValidator1(getItemCat), async (req: any, res: Response) => {
    const data = await itemCategoryController.getItemCategoryDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Delete Item Category 
 */
router.delete(p.deleteItemCategory, verifyAuthToken, checkRole(['Admin']), schemaValidator1(getItemCat), async (req: any, res: Response) => {
    const data = await itemCategoryController.deleteItemCategory(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});


// Export default
export default router;
