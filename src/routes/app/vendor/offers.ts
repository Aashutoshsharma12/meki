import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import offerController from '@controllers/vendor/offers';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';
import upload from '@utils/multer';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddOfferByVendor: '/AddOfferByVendor',
    EditOfferByVendor: '/EditOfferByVendor',
    GetOfferListingByVendor: '/GetOfferListingByVendor',
    GetOfferDetailsByVendor: '/GetOfferDetailsByVendor',
    updateOfferStatusByVendor: '/updateOfferStatusByVendor',
    DeleteOfferByVendor : '/DeleteOfferByVendor',
    getOffersByUser: '/getOffersByUser',
    getOfferDetailsByUser: '/getOfferDetailsByUser'
} as const;

/**
 * Add offer
 */
router.post(p.AddOfferByVendor, verifyAuthToken,upload.fields([{name:"image",maxCount:1}]),checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await offerController.AddOfferByVendor(req.body, req.user.id,req.files?.image, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

// Get vendor open closing
router.post(p.EditOfferByVendor, verifyAuthToken,upload.fields([{name:"image",maxCount:1}]),checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await offerController.EditOfferByVendor(req.body, req.user.id,req.files?.image, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get open closing details
router.post(p.GetOfferListingByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await offerController.GetOfferListingByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Delete open close 
router.post(p.GetOfferDetailsByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await offerController.GetOfferDetailsByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get open closing details
router.post(p.updateOfferStatusByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await offerController.updateOfferStatusByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Delete open close 
router.post(p.DeleteOfferByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await offerController.DeleteOfferByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get open closing details
router.post(p.getOffersByUser, verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await offerController.getOffersByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Delete open close 
router.post(p.getOfferDetailsByUser, verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await offerController.getOfferDetailsByUser(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
