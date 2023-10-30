import { Schema, model, mongo } from "mongoose"

interface report_issue_message {
    roomId: string;
    message: string;
    messageType: string;
    readStatus: Boolean,
    sendFrom: string,
    sendTo: string,
    date:any,
    timestamp: Number;
    isActive: boolean;
    isDelete: boolean;
};

const schema = new Schema<report_issue_message>({
    roomId: { type: String },
    message: { type: String },
    messageType: { type: String, default: 'text' },
    readStatus: {
        type: Boolean,
        default: false
    },
    sendFrom: {
        type: String,
        default: 'user'
    },
    sendTo: {
        type: String,
        default: 'delivery_boy'
    },
    date:{
        type: Date,
        default: new Date()
    },
    timestamp: {
        type: Number
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export const report_issue_messageModel = model<report_issue_message>('report_issue_messages', schema);