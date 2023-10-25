import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import categoryController from '@controllers/vendor/category';
import {schemaValidator} from '@utils/schemaValidator';
import { signUpSchema, accountVerificationSchema, logInSchema } from "@validators/auth"
import { success } from '@constants';
import { ok } from 'assert';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    categoryListForUser: '/categoryListForUser',
    exploreListForUser: '/exploreListForUser'
} as const;

/**
 *Category List For Users
 */
router.post(p.categoryListForUser, schemaValidator(signUpSchema), async (req: Request, res: Response) => {
    const data = await categoryController.categoryListForUser(req.body , req.headers);
    return res.status(CREATED).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Explore list for users
 */
router.post(p.exploreListForUser, schemaValidator(accountVerificationSchema), async (req: Request, res: Response) => {
    const data = await categoryController.exploreListForUser(req.body , req.headers);
    return res.status(OK).send({ data, code: OK, message:success.en.success,result:data });
});


// Export default
export default router;
