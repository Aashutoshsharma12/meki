import { Schema, model } from 'mongoose';

interface support {
    userId: Object;   // vendor, user
    deliveryPersonId: Object;
    message: string;
    status: string;
    addBy: string;
    isActive: boolean;
    isDelete: boolean;
}

const schema = new Schema<support>({
    userId: { type: Schema.Types.ObjectId },
    deliveryPersonId: { type: Schema.Types.ObjectId },
    status: { type: String, default:'Open'},   //Open ,Closed
    message: { type: String },
    addBy: { type: String },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});

const supportModel = model<support>('support', schema);
export = supportModel;
