import { Schema, model } from 'mongoose';

interface order {
    userId:Object;
    vendorId:Object;
    orderId:string;
    items:any;
    timeStamp:string;
    promocode:string;
    note:string;
    promoCode_Amount:Number;
    sub_total:Number;
    convience_tax:Number;
    grand_total:Number;
    total_discount:Number;
    tax:Number;
    address:string;
    delivery_time:string;
    city:string;
    order_lat: string;
    order_long:string;
    status:string;
    order_Date:string;
    rating:Number;
    delivery_personId:Object;
    delivery_charge:Number;
    deliveryPerson_otp:Number;
    deliveryPerson_Status:String;
    item_collect:boolean;
    dpExpMessageId:Object;
    deliveryPersonStatus_track:Object;
    order_time:string;
    track_status:Object;
    tracking_loc:any;
    delivery_boy_last_loc:any;
    admin_tax:Number;
    petAtHome:Boolean;
    leaveAtDoor:Boolean;
    paymentType:string;
    paymentStatus:boolean;
    cancelledBy:string;
}

const schema = new Schema<order>({
    userId:{ type: Schema.Types.ObjectId, required:true, ref: 'User' },
    vendorId:{ type: Schema.Types.ObjectId, required:true, ref: 'User' },
    orderId:{ type: String },
    items:[{
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'category'
        },
        discount: {
            type: Number,
            default: 0
        },
        orderId: {
            type: String
        },

        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'item'
        },
        size: {
            type: Schema.Types.ObjectId,
            ref: 'menu_size'
        },
        per_item_price: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        item_price: {
            type: Number,
            default: 0
        },
        addOn: [{
            addonId: {
                type: Schema.Types.ObjectId,
                ref: 'addOns'
            },
            title: {
                type: String,
                default: ''
            },
            per_addon_price: {
                type: Number,
                default: 0
            },
            quantity: {
                type: Number,
                default: 0
            },
            item_addon_price: {
                type: Number,
                default: 0
            },
        }]
    }],
    timeStamp:{ type: String },
    promocode:{ type: String },
    note:{ type: String },
    promoCode_Amount:{ type: Number },
    sub_total:{ type: Number },
    convience_tax:{ type: Number },
    grand_total:{ type: Number },
    total_discount:{ type: Number },
    tax:{ type: Number },
    address:{ type: String },
    delivery_time:{ type: String },
    city:{ type: String },
    order_lat: { type: String },
    order_long:{ type: String },
    status:{ type: String },
    order_Date:{ type: String },
    rating:{ type: Number },
    order_time:{ type: String },
    delivery_personId:{ type: Schema.Types.ObjectId, ref: 'deliveryPersons'},
    delivery_charge:{ type: Number},
    deliveryPerson_otp:{ type: Number},
    deliveryPerson_Status:{ type: String},
    item_collect:{ type: Boolean, default: false},
    dpExpMessageId:[{ type: Schema.Types.ObjectId, ref: 'dpExpMessage'}],
    deliveryPersonStatus_track:[{
        status: {
            type: String,
            default: 'pending'
        },
        statusDate: {
            type: Date
        },
        acceptTime: {
            type: String,
            default: ''
        }
    }],
    track_status:[{
        status: {
            type: String,
            default: 'pending'
        },
        statusDate: {
            type: Date
        },
        acceptTime: {
            type: String,
            default: ''
        }
    }],
    tracking_loc:[],
    delivery_boy_last_loc:{},
    admin_tax:{ type: Number },
    petAtHome:{ type: Boolean, default: false},
    leaveAtDoor:{ type: Boolean, default: false},
    paymentType:{ type: String },
    paymentStatus:{ type: Boolean },
    cancelledBy:{ type: String }
}, {
    timestamps: true,
    versionKey: false
});

const orderModel = model<order>('orders', schema);
export = orderModel