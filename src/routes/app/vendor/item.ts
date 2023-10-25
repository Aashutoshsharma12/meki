import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import itemController from '@controllers/vendor/item';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';
import upload from '@utils/multer';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItemByVendor: '/AddItemByVendor',
    getItemByVendor: '/getItemByVendor',
    EditItemByVendor: '/EditItemByVendor',
    getItemDetails: '/getItemDetails',
    ActiveDeactiveItem : '/ActiveDeactiveItem',
    DeleteItemMenu: '/DeleteItemMenu',
    getItemByUser: '/getItemByUser',
    getMenuListCountByUser:'/getMenuListCountByUser'
} as const;

/**
 * Add Item
 */
router.post(p.AddItemByVendor,upload.fields([{name:"image",maxCount:1}]), verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemController.AddItemByVendor(req.body, req.user.id,req.files?.image, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get Item
 */
router.post(p.getItemByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemController.getItemByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Edit Item
 */
router.post(p.EditItemByVendor,upload.fields([{name:"image",maxCount:1}]), verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemController.EditItemByVendor(req.body, req.user.id,req.files?.image, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get Item details
 */
router.post(p.getItemDetails, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemController.getItemDetails(req.body, req.vendor.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update Item status
 */
router.post(p.ActiveDeactiveItem, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemController.ActiveDeactiveItem(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Delete Item
 */
router.post(p.DeleteItemMenu, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await itemController.DeleteItemMenu(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get Item by user
 */
router.post(p.getItemByUser, verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await itemController.getItemByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get menu item count by user
 */
router.post(p.getMenuListCountByUser, verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await itemController.getMenuListCountByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
