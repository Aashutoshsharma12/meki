import notificationModel from "@models/notification"
import { CustomError } from "@utils/errors"
import { StatusCodes } from "http-status-codes"
import moment from "moment-timezone"

//Add and Send Notification
function sendNotification(body: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { title, meso_tittle, description, meso_description, sendDate, sendFrom, sendTo, sendTime } = body
            const { timezone } = headers
            console.log(timezone, "dldl", 'timezoneOffset')
            const obj = {
                ...body,
                sendDate: moment().tz(timezone).format('DD-MM-YYYY'),
                sendTime: moment().tz(timezone).format('HH:MM')
            }
            const add = await notificationModel.create(obj);
            resolve(add);
            if (add) {
                // Send Notification 

            }
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
            const list = await notificationModel.find({sendTo: sendTo }).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            const count = await notificationModel.countDocuments({sendTo: sendTo });
            resolve({ list, count: count })
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

export default {
    sendNotification,
    notificationList
} as const;