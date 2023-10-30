import { topics } from "@constants"
import notificationModel from "@models/notification"
import { CustomError } from "@utils/errors"
import { sendBulkNotification } from "@utils/helpers"
// import { sendBulkNotification, sendPushNotification } from "@utils/helpers"
import { StatusCodes } from "http-status-codes"
import moment from "moment-timezone"

//Add and Send Notification
function sendNotification(body: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { title, meso_tittle, description, meso_description, sendDate, sendFrom, sendTo, sendTime } = body
            const { timezone } = headers
            const obj = {
                ...body,
                sendDate: moment().tz(timezone).format('DD-MM-YYYY'),
                sendTime: moment().tz(timezone).format('HH:MM')
            }
            const add = await notificationModel.create(obj);
            if (add) {
                // Send Notification 
                sendBulkNotification(obj,sendTo)
            }
            resolve(add);
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    })
}

//Notification List
function notificationList(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10, sendTo } = query;
            let obj: any = {
                isDelete: false
            }
            if (sendTo) {
                obj = {
                    ...obj,
                    sendTo: sendTo
                }
            }
            const list = await notificationModel.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            const count = await notificationModel.countDocuments(obj);
            resolve({ list, count: count })
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

//delete
function deleteNotification(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { notificationId } = query;
            if (!notificationId) {
                reject(new CustomError('NotificationId required', StatusCodes.BAD_REQUEST));
            }
            await notificationModel.updateOne({ _id: notificationId }, { isDelete: true });
            resolve({ success: true });
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

export default {
    sendNotification,
    notificationList,
    deleteNotification
} as const;