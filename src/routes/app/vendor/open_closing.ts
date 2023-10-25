import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import open_closingController from '@controllers/vendor/open_closing';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';
import upload from '@utils/multer';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddVendorOpenClosing: '/AddVendorOpenClosing',
    getVendorOpenClosing: '/getVendorOpenClosing',
    getOpenCloseDetail: '/getOpenCloseDetail',
    deleteOpenClose: '/deleteOpenClose'
} as const;

/**
 * Add open closing
 */
router.post(p.AddVendorOpenClosing, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await open_closingController.AddVendorOpenClosing(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

// Get vendor open closing
router.post(p.getVendorOpenClosing, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await open_closingController.getVendorOpenClosing(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get open closing details
router.post(p.getOpenCloseDetail, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await open_closingController.getOpenCloseDetail(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Delete open close 
router.post(p.deleteOpenClose, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await open_closingController.deleteOpenClose(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
