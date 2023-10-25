import orderModel from "@models/order"
import userModel from "@models/users"
import { CustomError } from "@utils/errors"
import { StatusCodes } from "http-status-codes"
import user from "./user"

function user_orderList(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId } = query
            if (!userId) {
                reject(new CustomError("UserId required", StatusCodes.BAD_REQUEST))
            } else {
                const [details, orderDetails, count] = await Promise.all([userModel.findOne({ _id: userId }, { name: 1, email: 1, phoneNumber: 1, countryCode: 1, image: 1 }), orderModel.find({ userId: userId }).sort({ createdAt: 1 }), orderModel.countDocuments({ userId: userId })]);
                resolve({ userDetails: details, orderDetails: orderDetails, count: count })
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST))
        }
    })
}


export default {
    user_orderList
} as const;