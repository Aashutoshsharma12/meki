import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import messageController from '@controllers/vendor/message';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
import { success } from '@constants';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    getRoomsbyUser: '/getRoomsbyUser',
    getRoomByPerson: '/getRoomByPerson',
    getMessages: '/getMessages'
} as const;

/**
 * Get room by users
 */
router.post(p.getRoomsbyUser, verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await messageController.getRoomsbyUser(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get room by delivery person
 */
router.post(p.getRoomByPerson, verifyAuthToken, async (req: any, res: Response) => {
    const data = await messageController.getRoomByPerson(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});

/**
 * Get messages
 */
router.post(p.getMessages, verifyAuthToken, async (req: any, res: Response) => {
    const data = await messageController.getMessages(req.body, req.user.id, req.headers);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.success,result:data});
});


// Export default
export default router;
