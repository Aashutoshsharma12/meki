import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import menu_sizeController from '@controllers/vendor/menu_size';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemMenuSize: '/AddItemMenuSize',
    getMenuSizeByVendor: '/getMenuSizeByVendor',
    EditItemMenuSizeByVendor: '/EditItemMenuSizeByVendor',
    getItemMenuSizeDetails: '/getItemMenuSizeDetails',
    ActiveDeactiveItemMenuSize : '/ActiveDeactiveItemMenuSize',
    DeleteItemMenuSize: '/DeleteItemMenuSize',
    getItemMenuSizeByUser:'/getItemMenuSizeByUser'
} as const;

/**
 * Add Item Menu Size
 */
router.post(p.AddItemMenuSize, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await menu_sizeController.AddItemMenuSize(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get Item Menu Size
 */
router.post(p.getMenuSizeByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await menu_sizeController.getMenuSizeByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Edit Item Menu Size
 */
router.post(p.EditItemMenuSizeByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await menu_sizeController.EditItemMenuSizeByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get Item Menu Size details
 */
router.post(p.getItemMenuSizeDetails, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await menu_sizeController.getItemMenuSizeDetails(req.body, req.vendor.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update Item Menu Size status
 */
router.post(p.ActiveDeactiveItemMenuSize, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await menu_sizeController.ActiveDeactiveItemMenuSize(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Delete Item Menu Size
 */
router.post(p.DeleteItemMenuSize, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await menu_sizeController.DeleteItemMenuSize(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get Item Menu Size by user
 */
router.post(p.getItemMenuSizeByUser, verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await menu_sizeController.getItemMenuSizeByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
