import { Router } from 'express';
import orderController from '@controllers/admin/order';
import { checkRole, verifyAuthToken } from '@utils/authValidator';
import { StatusCodes } from 'http-status-codes';
import { success } from '@constants';
const router = Router();
const { OK, CREATED } = StatusCodes

export const p = {
    userOrderList: 'userOrderList'
}

router.get('/userOrderList', verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await orderController.user_orderList(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched })
});

export default router;