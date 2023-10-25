import { Schema, model } from 'mongoose';

interface offer {
    vendorId: Object;
    offer_token:string;
    name: string;
    lower_name:string;
    meso_name:string;
    meso_lower_name:string;
    description: string;
    meso_description:string;
    min_order_amount: number;
    max_offer_amount: number;
    offer_per: number;
    start_date:string;
    end_data:string;
    image: string;
    isActive: boolean;
    isDelete: boolean;
}

const schema = new Schema<offer>({
    vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
    offer_token: { type: String},
    name: { type: String, default: ''},
    lower_name: { type: String, default: ''},
    meso_name: { type: String, default: ''},
    meso_lower_name:{ type: String, default: ''},
    description: { type: String, default: ''},
    meso_description: { type: String, default: ''},
    min_order_amount: { type: Number, default: 0},
    max_offer_amount: { type: Number, default: 0},
    offer_per: { type: Number, default: 0},
    start_date: { type: String},
    end_data: { type: String},
    image: { type: String},
    isActive: { type: Boolean, default: true},
    isDelete: { type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

const offerModel = model<offer>('offer', schema);
export = offerModel