import { Schema, model } from 'mongoose';

interface dpExpMessage { // delivery person experience with customer
  title: string;
  meso_title: string;
  lower_title: string;
  lower_meso_title: string;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<dpExpMessage>({
  title: { type: String, default: ''},
  lower_title: { type: String, default: ''},
  meso_title: { type: String, default: ''},
  lower_meso_title: { type: String, default: ''},
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false
});

const dpExpMessageModel = model<dpExpMessage>('dpExpMessage', schema);
export = dpExpMessageModel;
