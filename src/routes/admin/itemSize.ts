import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import menu_sizeController from '@controllers/admin/itemSize';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';
import { schemaValidator } from '@utils/schemaValidator';
import { addSize, editSize } from '@validators/itemSize';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemMenuSize: '/add',
    listMenuSize: '/list',
    EditItemMenuSize: '/edit',
    getItemMenuSizeDetails: '/get',
    DeleteItemMenuSize: '/delete'
} as const;

/**
 * Add Item Menu Size
 */
router.post(p.AddItemMenuSize, verifyAuthToken,checkRole(['Admin']),schemaValidator(addSize), async (req: any, res: Response) => {
    const data = await menu_sizeController.AddItemMenuSize(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success});
});

/**
 * Get Item Menu Size
 */
router.get(p.listMenuSize, verifyAuthToken,checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await menu_sizeController.listMenuSize(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success});
});

/**
 * Edit Item Menu Size
 */
router.put(p.EditItemMenuSize, verifyAuthToken,checkRole(['Admin']),schemaValidator(editSize), async (req: any, res: Response) => {
    const data = await menu_sizeController.EditItemMenuSize(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success});
});

/**
 * Get Item Menu Size details
 */
router.get(p.getItemMenuSizeDetails, verifyAuthToken,checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await menu_sizeController.getItemMenuSizeDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success});
});

/**
 * Delete Item Menu Size
 */
router.delete(p.DeleteItemMenuSize, verifyAuthToken,checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await menu_sizeController.DeleteItemMenuSize(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success});
});


// Export default
export default router;
