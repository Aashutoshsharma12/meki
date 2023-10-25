import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import homeController from '@controllers/user/home';
import {schemaValidator} from '@utils/schemaValidator';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { registerAddressSchema } from "@validators/user";
import { success } from '@constants';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    ResturantListForUserHome: '/ResturantListForUserHome',
    ResturantListForUserCategory:'/ResturantListForUserCategory',
    recentSearch:'/recentSearch'
 

} as const;

/**
 * Restro list for home
 */
router.post(p.ResturantListForUserHome,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await homeController.ResturantListForUserHome(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Restro list by item and search
 */
router.post(p.ResturantListForUserCategory,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await homeController.ResturantListForUserCategory(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Recent search
 */
 router.post(p.recentSearch,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await homeController.recentSearch(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Export default
export default router;
