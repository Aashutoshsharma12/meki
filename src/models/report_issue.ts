import { Schema, model, mongo } from "mongoose"

interface report_issue {
    title:string;
    desc: string;
    messo_title: string;
    meso_desc: string;
    image:string;
    userId:any;
    ticketId:string;
    status: string;
    isActive: boolean;
    isDelete: boolean;
};

const schema = new Schema<report_issue>({
    title:{ type: String, default: ''},
    desc: { type: String, default: ''},
    messo_title: { type: String, default: ''},
    meso_desc: { type: String, default: ''},
    image: { type: String, default: ''},
    userId: { type: Schema.Types.ObjectId, ref: 'user'},
    ticketId:{ type: String, default: ''},
    status : { type: String, default:'pending'},
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export const report_issueModel = model<report_issue>('report_issues', schema);