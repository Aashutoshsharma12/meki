import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import itemController from '@controllers/admin/item';
import { verifyAuthToken, checkRole } from "@utils/authValidator";
import { success } from '@constants';
import upload from '@utils/multer';
import { schemaValidator } from '@utils/schemaValidator';
import { addItem, editItem } from '@validators/menuItem';
import { upload1, upload_stream } from '@utils/multer1';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddItem: '/AddItem',
    // getItem: '/getItem',
    EditItem: '/EditItem',
    getItemDetails: '/getItemDetails',
    DeleteItemMenu: '/DeleteItemMenu',
    catList: '/catList'
} as const;

/**
 * Add Item
 */
router.post(p.AddItem, upload.fields([{ name: "image", maxCount: 1 }]), verifyAuthToken, checkRole(['Admin']), schemaValidator(addItem), async (req: any, res: Response) => {
    const data = await itemController.AddItem(req.body, req.files?.image);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
});

// /**
//  * Add Item
//  */
// router.post(p.AddItem, upload1.single('image'), upload_stream, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
//     // sharp(req.file.buffer)
//     //     .resize(200, 100)
//     //     .toFile('output.jpg', (err, info) => {
//     //         if (err) {
//     //             console.error(err);
//     //         } else {
//     //             console.log(info, "sslslslsls")
//     //         }
//     //     });
//     const data = await itemController.AddItem(req.body, req.files?.image);
//     return res.status(CREATED).send({ data, code: CREATED, message: success.en.success });
// });

// /**
//  * Get Item
//  */
// router.get(p.getItem, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
//     const data = await itemController.getItem(req.query);
//     return res.status(OK).send({ data, code: OK, message: success.en.success});
// });

/**
 * Edit Item
 */
router.put(p.EditItem, upload.fields([{ name: "image", maxCount: 1 }]), verifyAuthToken, checkRole(['Admin']), schemaValidator(editItem), async (req: any, res: Response) => {
    const data = await itemController.EditItem(req.body, req.files?.image);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Get Item details
 */
router.get(p.getItemDetails, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await itemController.getItemDetails(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * Delete Item
 */
router.delete(p.DeleteItemMenu, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await itemController.DeleteItemMenu(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});

/**
 * List ItemCategory
 */
router.get(p.catList, verifyAuthToken, checkRole(['Admin']), async (req: any, res: Response) => {
    const data = await itemController.ItemCategoryList(req.query);
    return res.status(OK).send({ data, code: OK, message: success.en.success });
});



// Export default
export default router;
