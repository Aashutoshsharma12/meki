import mongoose, { Schema, model } from 'mongoose';

interface favourite {
  userId: any;
  vendorId:any;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<favourite>({ 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  //userId
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  //resturantId
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }, 
}, {
  timestamps: true,
  versionKey: false
});

const favouriteModel = model<favourite>('favourites', schema);
export = favouriteModel
