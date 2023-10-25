import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import branchController from '@controllers/vendor/branch';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';
import upload from '@utils/multer';
import { ok } from 'assert';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    GetVendorBranchs: '/GetVendorBranchs',
    GetBranchDetailsByVendor: '/GetBranchDetailsByVendor',
    EditBranchImageByVendor: '/EditBranchImageByVendor',
    EditBranchMobileByVendor:'/EditBranchMobileByVendor',
    SearchVendorBranch: '/SearchVendorBranch',
    UpdateOnlineOfflineStatus: '/UpdateOnlineOfflineStatus'
} as const;

// Get vendor branch
router.post(p.GetVendorBranchs, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await branchController.GetVendorBranchs(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Get vendor branch detail
router.post(p.GetBranchDetailsByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await branchController.GetBranchDetailsByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Edit branch image by vendor
router.post(p.EditBranchImageByVendor, verifyAuthToken,upload.fields([{name:"image",maxCount:1}]),checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await branchController.EditBranchImageByVendor(req.body, req.user.id,req.files?.image, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Edit branch number by vendor
router.post(p.EditBranchMobileByVendor, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await branchController.EditBranchMobileByVendor(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Search branch by vendor
router.post(p.SearchVendorBranch, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await branchController.SearchVendorBranch(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Update branch status
router.post(p.UpdateOnlineOfflineStatus, verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await branchController.UpdateOnlineOfflineStatus(req.body, req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
