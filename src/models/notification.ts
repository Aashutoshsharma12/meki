import { Schema, model } from "mongoose";

interface notification {
    title: String;
    meso_tittle: String;
    description: String;
    meso_description: String;
    sendTo: String;
    sendFrom: String;
    sendDate: String;
    sendTime: String;
    status: boolean;
    isDelete: boolean;
}

const schema = new Schema<notification>({
    title: { type: String },
    meso_tittle: { type: String },
    description: { type: String },
    meso_description: { type: String },
    sendTo: { type: String },
    sendFrom: { type: String },
    sendDate: { type: String },
    sendTime: { type: String },
    status: { type: Boolean },
    isDelete: { type: Boolean ,default:false}
});
const notificationModel = model<notification>('notification', schema);
export = notificationModel;