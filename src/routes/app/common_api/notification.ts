import { Router } from "express";
import notificationController from '@controllers/common_api/notification';
import { StatusCodes } from "http-status-codes";
import { checkRole, verifyAuthToken } from "@utils/authValidator";
import { schemaValidator } from "@utils/schemaValidator";
import { success } from "@constants";
import { addNotification } from "@validators/category";

const router = Router();
const { OK, CREATED } = StatusCodes;

export const p = {
    sendNotification: '/sendNotification',
    notificationList: '/notificationList',
    delete: '/delete'
} as const;

router.post(p.sendNotification, verifyAuthToken, checkRole(['Admin']), schemaValidator(addNotification), async (req, res) => {
    const data = await notificationController.sendNotification(req.body, req.headers);
    return res.status(CREATED).json({ data, code: CREATED, message: success.en.success });
});
router.get(p.notificationList, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await notificationController.notificationList(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.recordFetched });
});
router.delete(p.delete, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await notificationController.deleteNotification(req.query);
    return res.status(OK).json({ data, code: OK, message: success.en.success });
})

export default router;