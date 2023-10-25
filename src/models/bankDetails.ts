import mongoose, { Schema, model } from "mongoose";

interface BankDetails {
    vendorId:any;
    bankDetails: any;
    isActive: boolean;
    isDelete: boolean
}

const schema = new Schema<BankDetails>({
    vendorId:{type:mongoose.Schema.Types.ObjectId,ref:'restaurant'},  //restaurantId
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    bankDetails: {
        bankName: { type: String },
        IFSC_code: { type: String },
        cr_number: { type: String },
        branchNumber: { type: String },
        accountNumber: { type: String },
    }
}, {
    timestamps: true,
    versionKey: false
});

const bank_detailsModel = model<BankDetails>('bank_details', schema)

export = bank_detailsModel;