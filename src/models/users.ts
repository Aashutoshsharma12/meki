import mongoose, { Schema, model } from 'mongoose';

interface User {
  name: string;
  lower_name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  catId: any;
  exploreId: any;
  image: string; //user vendor Image
  role: string;        // user , vendor 
  gender: string;       // Male , Female , Other
  dob: string;
  branchNo: string;
  language: string;      // English to Macedonia
  lat: string;
  long: string;
  vendorId: any;  //restaurantId
  branchType: string;
  restaurantName: string;
  restaurant_mesoName: string;
  adminPercentage: number;
  vendor_status: string;
  restaurantImage: string;  //restaurant logo
  totalBranch: Number;
  branchDetails: any;
  rating: Number;
  total_order: Number,
  categoryId: any;
  food_type: any;
  itemId: any;
  item_price: Number;
  delivery_time: String;
  status: string;
  documents: string;
  document_status: boolean;
  addBy: string;
  isPhoneVerified: boolean;
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  lower_name: { type: String },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  countryCode: { type: String, required: true, default: '+91' },
  role: { type: String, required: true },
  gender: { type: String },
  dob: { type: String },
  branchNo: { type: String },
  isPhoneVerified: { type: Boolean, default: true },
  image: { type: String },  //user , vendor image
  language: { type: String, default: "en" },
  catId: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  exploreId: { type: mongoose.Schema.Types.ObjectId, ref: 'explore' },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  //restaurantId
  branchType: { type: String, default: "Main" },  //Main,Sub
  restaurantName: { type: String },
  restaurant_mesoName: { type: String },
  adminPercentage: { type: Number },
  restaurantImage: { type: String },  //restaurant logo
  totalBranch: { type: Number, default: 1 },
  status: { type: String, default: "Disapproved" }, //Approved,Disapproved  branch status
  documents: { type: String },
  document_status: { type: Boolean, default: false },
  addBy: { type: String },
  vendor_status: { type: String, default: "Accepted" },
  branchDetails: {
    delivery_charges: { type: Number },
    minimum_orderAmount: { type: Number },
    openingTime: { type: String },
    closingTime: { type: String },
    mobileNo: { type: String },
    countryCode: { type: String },
    max_deliveryTime: { type: String },
    branchImage: { type: String },        //branch image
    paymentMehod: [],
    addressDetails: {
      country: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String },
      fullAddress: { type: String, required: true }
    }
  },
  rating: { type: Number, default: 0 },
  total_order: { type: Number, default: 0 },
  categoryId: [],
  food_type: [],
  itemId: [],
  item_price: { type: Number },
  // delivery_time:{type:String},
  lat: { type: String },
  long: { type: String },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false
});

const userModel = model<User>('User', schema);
export = userModel
