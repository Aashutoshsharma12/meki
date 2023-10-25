import { Schema, model } from 'mongoose';

interface category {
  name: string;
  lower_name:string;
  meso_name:String;
  meso_lower_name:String;
  description:String;
  meso_description:String;
  image: string;
  position: number; 
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<category>({ 
  name: { type: String, required: true },
  lower_name:{type:String},
  meso_name: { type: String,required:true },
  meso_lower_name:{type:String},
  description: { type: String },
  meso_description: { type: String},
  image: { type: String },
  position: { type: Number},
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }, 
}, {
  timestamps: true,
  versionKey: false
});

const categoryModel = model<category>('category', schema);
export = categoryModel;
