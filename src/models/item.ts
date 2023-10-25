import { Schema, model } from 'mongoose';

interface item {
    catId: Object;
    vendorId: Object;
    name: string;
    lower_name:string;
    meso_name:string;
    meso_lower_name:string;
    menu_size_price: number;
    price: number;
    menuType: string;
    addBy:string;
    time: string;
    available:boolean;
    description: string;
    meso_description:string;
    quantity: number;
    addOn_count: number;
    menuSize_count: number;
    addOn_Cat_count:number;
    image: string;
    isActive: boolean;
    isDelete: boolean;
}

const schema = new Schema<item>({
    catId: { type: Schema.Types.ObjectId, ref: 'item_category' },
    vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default:'' },
    lower_name: { type: String, default: ''},
    meso_name: { type: String, default: ''},
    meso_lower_name: { type: String, default: ''},
    menu_size_price: { type: Number, default: 0},
    price: { type: Number, default: 0},
    addBy:{type:String,default:'Vendor'},
    menuType: { type: String, default: ''}, // veg/ non-veg
    time: { type: String, default: ''},
    description: { type: String, default: ''},
    available:{type:Boolean,default:true},
    meso_description:{type:String,default:''},
    quantity: { type: Number, default: 1},
    addOn_count: { type:Number, default: 0},
    menuSize_count: { type: Number, default: 0},
    addOn_Cat_count: { type: Number, default: 0},
    image: { type: String, default: ''},
    isActive: { type: Boolean, default: true},
    isDelete: { type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

const itemModel = model<item>('item', schema);
export = itemModel