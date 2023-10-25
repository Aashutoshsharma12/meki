import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import orderController from '@controllers/user/order';
//import schemaValidator from '@utils/schemaValidator';
import { verifyAuthToken ,checkRole} from "@utils/authValidator";
//import { registerAddressSchema } from "@validators/user";
import { success } from '@constants';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    AddCartByUser: '/AddCartByUser',
    GetOrderListByUser:'/GetOrderListByUser',
    GetOrderDetailsByUser:'/GetOrderDetailsByUser',
    GetOrderListByVendor:'/GetOrderListByVendor',
    GetOrderHistoryByVendor:'/GetOrderHistoryByVendor',
    GetOrderDetailsByVendor:'/GetOrderDetailsByVendor',
    UpdateOrderStatusByVendor:'/UpdateOrderStatusByVendor',
    UpdateOrderStatusByUser:'/UpdateOrderStatusByUser',
    MakeAnOrderByUser:'/MakeAnOrderByUser',
    UpdateDeliveryTimeByVendor:'/UpdateDeliveryTimeByVendor',
    getOrderListingForU:'/getOrderListingForU',
    GetOrderListingForVen:'/GetOrderListingForVen',
    getOrderStatusCountByVendor:'/getOrderStatusCountByVendor'
} as const;

/**
 * Add cart
 */
router.post(p.AddCartByUser,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await orderController.AddCartByUser(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get order listing by user
 */
router.post(p.GetOrderListByUser,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await orderController.GetOrderListByUser(req.body ,req.user.id, req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get order details by user
 */
 router.post(p.GetOrderDetailsByUser,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await orderController.GetOrderDetailsByUser(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get order listing by vendor
 */
router.post(p.GetOrderListByVendor,verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await orderController.GetOrderListByVendor(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get order history by vendor
 */
router.post(p.GetOrderHistoryByVendor,verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await orderController.GetOrderHistoryByVendor(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get order details by vendor
 */
router.post(p.GetOrderDetailsByVendor,verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await orderController.GetOrderDetailsByVendor(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update order status by vendor
 */
router.post(p.UpdateOrderStatusByVendor,verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await orderController.UpdateOrderStatusByVendor(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update order status by user
 */
router.post(p.UpdateOrderStatusByUser,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await orderController.UpdateOrderStatusByUser(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Make an order by user
 */
router.post(p.MakeAnOrderByUser,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await orderController.MakeAnOrderByUser(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Update order delivery time by vendor
 */
router.post(p.UpdateDeliveryTimeByVendor,verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await orderController.UpdateDeliveryTimeByVendor(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get order listing for user
 */
router.post(p.getOrderListingForU,verifyAuthToken,checkRole(['user']), async (req: any, res: Response) => {
    const data = await orderController.getOrderListingForU(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get order listing for vendor
 */
router.post(p.GetOrderListingForVen,verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await orderController.GetOrderListingForVen(req.body,req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

/**
 * Get orders status count for vendor
 */
router.get(p.getOrderStatusCountByVendor,verifyAuthToken,checkRole(['vendor']), async (req: any, res: Response) => {
    const data = await orderController.getOrderStatusCountByVendor(req.user.id,req.headers);
    return res.status(OK).send({ data, code: OK, message: success.en.success,result:data});
});

// Export default
export default router;
