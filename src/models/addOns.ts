import { Schema, model } from 'mongoose';

interface addOns {
  vendorId: Object;
  addOns_CatId: Object;
  itemId: any;
  name: string;
  addBy:string;
  lower_name: string;
  meso_name: String;
  meso_lower_name: String;
  price: Number;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<addOns>({
  vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
  addOns_CatId: { type: Schema.Types.ObjectId, ref: 'addOns_category' },
  itemId: { type: Schema.Types.ObjectId, ref: 'item' },
  name: { type: String, default: '' },
  addBy:{type:String,default:'Vendor'},
  lower_name: { type: String, default: '' },
  meso_name: { type: String, default: '' },
  meso_lower_name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false
});

const addOnsModel = model<addOns>('addOns', schema);
export = addOnsModel;
