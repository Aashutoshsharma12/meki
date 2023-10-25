import { Schema, model } from 'mongoose';

interface item_category {
  vendorId: Object;
  name: string;
  lower_name: string;
  meso_name: String;
  meso_lower_name: String;
  description: String;
  meso_description: String;
  image: string;
  addBy: string;
  position: string;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<item_category>({
  vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  lower_name: { type: String },
  meso_name: { type: String, required: true },
  addBy: { type: String, default: 'Vendor' },
  meso_lower_name: { type: String },
  description: { type: String },
  meso_description: { type: String },
  image: { type: String },
  position: { type: String },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false
});

const item_categoryModel = model<item_category>('item_category', schema);
export = item_categoryModel;
