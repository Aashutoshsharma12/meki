import mongoose, { Schema, model } from 'mongoose';

interface search {
  name: string;
  lower_name:string;
  userId:any;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<search>({ 
  name: { type: String, required: true },
  lower_name:{type:String,required:true},
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }, 
}, {
  timestamps: true,
  versionKey: false
});

const searchModel = model<search>('recent_searchs', schema);
export = searchModel;