import { Schema, model } from 'mongoose';
interface open_closing {
    vendorId: Object;
    sunday:Object;
    monday:Object;
    tuesday:Object;
    wednesday:Object;
    thursday:Object;
    friday:Object;
    saturday:Object;
    isActive: boolean;
    isDelete: boolean;
}

const schema = new Schema<open_closing>({
    vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
    sunday:{
        open:{ type: String},
        close:{ type: String},
        status:{ type: Boolean, default: true}
    },
    monday:{
        open:{ type: String},
        close:{ type: String},
        status:{ type: Boolean, default: true}
    },
    tuesday:{
        open:{ type: String},
        close:{ type: String},
        status:{ type: Boolean, default: true}
    },
    wednesday:{
        open:{ type: String},
        close:{ type: String},
        status:{ type: Boolean, default: true}
    },
    thursday:{
        open:{ type: String},
        close:{ type: String},
        status:{ type: Boolean, default: true}
    },
    friday:{
        open:{ type: String},
        close:{ type: String},
        status:{ type: Boolean, default: true}
    },
    saturday:{
        open:{ type: String},
        close:{ type: String},
        status:{ type: Boolean, default: true}
    },
    isActive: { type: Boolean, default: true},
    isDelete: { type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

const open_closingModel = model<open_closing>('open_closing', schema);
export = open_closingModel