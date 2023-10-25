import { Schema, model } from 'mongoose';

interface menu_size {
  vendorId:Object;
  itemId:Object;
  name: string;
  lower_name:string;
  addBy:string;
  meso_name:String;
  meso_lower_name:String;
  price:Number;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<menu_size>({ 
    vendorId: { type: Schema.Types.ObjectId, ref: 'User'},
    itemId: { type: Schema.Types.ObjectId, ref: 'item'},
    name: { type: String, default: ''},
    lower_name: { type: String, default: ''},
    addBy:{type:String,default:'Vendor'},
    meso_name: { type: String, default: ''},
    meso_lower_name: { type: String, default: ''},
    price: { type: Number, default: 0},
    isActive: {type:Boolean, default: true},
    isDelete: {type:Boolean, default: false}
}, {
  timestamps: true,
  versionKey: false
});

const menu_sizeModel = model<menu_size>('menu_size', schema);
export = menu_sizeModel;
