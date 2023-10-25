import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import userController from '@controllers/admin/user';
import { schemaValidator } from '@utils/schemaValidator';
import { signUpSchema, loginSchema, changePasswordSchema } from "@validators/admin";
import { verifyAuthToken, checkRole } from "@utils/authValidator";
import upload from '@utils/multer';
import { editVendor } from '@validators/deliveryPerson';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    list: '/list',
    userExcelList: '/userExcelList',
    deleteUser: '/deleteUser',
    vendorList: '/vendorList',
    vendorDetails: '/vendorDetails',
    edit: '/edit',
    updateStatus:'/updateStatus'
} as const;

/**
 * User List
 */
router.get(p.list, verifyAuthToken, checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await userController.getUsers(req.query, req.headers);
    return res.status(OK).send({ data, code: OK });
});
//***********deleteUser******** */
router.post(p.deleteUser, verifyAuthToken, checkRole(['Admin']), async (req: Request, res: Response) => {
    const data = await userController.deleteUser(req.body);
    return res.status(OK).send({ data, code: OK })
});
/**
 * User Excel data
 */
router.get(p.userExcelList, verifyAuthToken, checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await userController.userExcelList();
    return res.status(OK).send({ data, code: OK });
});
/**
 * Edit vendor
 */
router.put(p.edit, upload.fields([{ name: 'image', maxcount: 1 }]), verifyAuthToken, checkRole(["Admin"]),schemaValidator(editVendor), async (req: any, res: Response) => {
    const data = await userController.editVendor(req.body, req.files?.image);
    return res.status(CREATED).send({ data, code: CREATED });
});
/**
 * update vendor status
 */
router.get(p.updateStatus, verifyAuthToken, checkRole(["Admin"]), async (req: any, res: Response) => {
    const data = await userController.vendorStatus(req.query);
    return res.status(OK).send({ data, code: OK });
});

/**
 * Vendor List
 */
router.get(p.vendorList, verifyAuthToken, checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await userController.vendorList(req.query);
    return res.status(OK).send({ data, code: OK });
});

/**
 * vendorDetails
 */
router.get(p.vendorDetails, verifyAuthToken, checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await userController.vendorDetails(req.query);
    return res.status(OK).send({ data, code: OK });
});



// Export default
export default router;
