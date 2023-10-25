import { Schema, model } from 'mongoose';

interface deliveryPersons {
  name: string;
  addBy: string;
  image: string;
  phoneNumber: string;
  countryCode: string;
  phone_verify:boolean;
  language:string;
  notificationStatus:boolean;
  lat:String,
  long:String;
  status: boolean;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<deliveryPersons>({
  name: { type: String, default: '' },
  addBy: { type: String, default: 'Admin' },
  image: { type: String, default: '' },
  phoneNumber: { type: String },
  countryCode: { type: String },
  phone_verify: { type: Boolean, default: false},
  language: { type: String, default:'en'},
  notificationStatus: { type: Boolean, default:true},
  lat: { type: String},
  long: { type: String},
  status: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false
});

const deliveryPersonModel = model<deliveryPersons>('deliveryPersons', schema);
export = deliveryPersonModel;
