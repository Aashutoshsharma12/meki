import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import favouriteController from '@controllers/user/fav_vendor';
import {schemaValidator} from '@utils/schemaValidator';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { registerAddressSchema } from "@validators/user";
import { success } from '@constants';


// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddFavourite: '/AddFavourite',
    GetUserFavList:'/GetUserFavList'

} as const;

/**
 * Address register
 */
router.post(p.AddFavourite,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await favouriteController.AddFavourite(req.body ,req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Address Edit
 */
router.post(p.GetUserFavList,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await favouriteController.GetUserFavList(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});


// Export default
export default router;
