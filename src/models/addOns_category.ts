import { Schema, model } from 'mongoose';

interface addOns_category {
  vendorId:Object;
  itemId:Object;
  name: string;
  lower_name:string;
  quantity:Number;
  addOns_count:Number;
  meso_name:String;
  meso_lower_name:String;
  description:String;
  addBy:string;
  meso_description:String;
  image: string;
  position: string; 
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<addOns_category>({ 
  vendorId:{ type: Schema.Types.ObjectId, ref: 'User' },
  itemId: { type: Schema.Types.ObjectId, ref: 'items'},
  name: { type: String, required: true },
  lower_name:{type:String},
  quantity:{type:Number},
  addBy:{type:String,default:"Vendor"},
  addOns_count:{type:Number},
  meso_name: { type: String,required:true },
  meso_lower_name:{type:String},
  description: { type: String },
  meso_description: { type: String},
  image: { type: String },
  position: { type: String},
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }, 
}, {
  timestamps: true,
  versionKey: false
});

const addOns_categoryModel = model<addOns_category>('addOns_category', schema);
export = addOns_categoryModel;
