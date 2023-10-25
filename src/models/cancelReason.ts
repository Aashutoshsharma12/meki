import { Schema, model } from 'mongoose';

interface cancelReason {
    reason: string;
    addBy: string;
    lower_reason: string;
    meso_reason: String;
    meso_lower_reason: String;
    isActive: boolean;
    isDelete: boolean;
}

const schema = new Schema<cancelReason>({
    reason: { type: String, default: '' },
    addBy: { type: String, default: 'Admin' },
    lower_reason: { type: String, default: '' },
    meso_reason: { type: String, default: '' },
    meso_lower_reason: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

const cancelReasonModel = model<cancelReason>('cancelReason', schema);
export = cancelReasonModel;
