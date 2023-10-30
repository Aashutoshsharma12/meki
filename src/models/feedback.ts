import { Schema, model, mongo } from "mongoose"

interface feedback {
    userId: any;
    feedback: string;
    role:string;
    isActive: boolean;
    isDelete: boolean;
};

const schema = new Schema<feedback>({
    userId: { type:Schema.Types.ObjectId, ref: 'user'},
    feedback: { type: String},
    role: { type: String, default:'user'},
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

export const feedbackModel = model<feedback>('feedbacks', schema);