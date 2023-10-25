import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import addOnsController from '@controllers/admin/addons';
import { verifyAuthToken, checkRole } from "@utils/authValidator";
import { success } from '@constants';
import { schemaValidator } from '@utils/schemaValidator';
import { addaddons, addaddons_cat, editaddons, editaddons_cat } from '@validators/addons_cat';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemAddOns: '/add',
    listAddOns_Category: '/list',
    EditItemAddOns: '/edit',
    getItemAddOnsDetails: '/get',
    deleteAddons: '/delete'
} as const;

/**
 * Add Item AddOns 
 */
router.post(p.AddItemAddOns, verifyAuthToken, checkRole(['Admin']), schemaValidator(addaddons), async (req: any, res: Response) => {
    const data = await addOnsController.AddItemAddOns(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
});

/**
 * List Item AddOns 
 */
router.get(p.listAddOns_Category, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await addOnsController.listAddOns_Category(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Edit Item AddOns 
 */
router.put(p.EditItemAddOns, verifyAuthToken, checkRole(['Admin']), schemaValidator(editaddons), async (req: any, res: Response) => {
    const data = await addOnsController.EditItemAddOns(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
});

/**
 * Get Item AddOns  details
 */
router.get(p.getItemAddOnsDetails, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await addOnsController.getItemAddOnsDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Delete Item AddOns 
 */
router.delete(p.deleteAddons, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await addOnsController.DeleteItemAddons(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

// Export default
export default router;
