import mongoose, { Schema, model } from 'mongoose';

interface rating {
  rating: Number;
  desc:string;
  userId:any;
  vendorId:any;
  orderId:any;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<rating>({ 
  rating: { type: Number},
  desc:{type:String},
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vendorId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }, 
}, {
  timestamps: true,
  versionKey: false
});

const ratingModel = model<rating>('ratings', schema);
export = ratingModel;