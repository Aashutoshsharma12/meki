import mongoose, { Schema, model } from 'mongoose';

interface room {
  roomId: object;
  userId:object;
  deliveryPId:object;
  creatorId:object;
  orderId:any;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<room>({ 
    roomId: {type: Schema.Types.ObjectId, ref: 'orders'},
    userId:{type: Schema.Types.ObjectId, ref: 'users'},
    deliveryPId:{type: Schema.Types.ObjectId, ref: 'deliveryPersons'},
    creatorId:{type: Schema.Types.ObjectId},
    orderId:{type: Number},
    isActive: {type: Boolean, default: true},
    isDelete: {type: Boolean, default: false}
}, {
  timestamps: true,
  versionKey: false
});

const roomModel = model<room>('rooms', schema);
export = roomModel;