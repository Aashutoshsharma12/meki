import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import ratingController from '@controllers/user/rating';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddRatingByUser: '/AddRatingByUser',
    getRatingByVendor:'/getRatingByVendor'
} as const;

/**
 * Add Rating
 */
router.post(p.AddRatingByUser,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await ratingController.AddRatingByUser(req.body ,req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get Rating by vendor
 */
router.post(p.getRatingByVendor,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await ratingController.getRatingByVendor(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Export default
export default router;
