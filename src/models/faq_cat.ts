import { Schema, model } from "mongoose"

interface Faq_cat {
    name: string;
    messo_name: string;
    lower_name: string;
    lower_messo_name: string;
    isActive: boolean;
    isDelete: boolean;
};

const schema = new Schema<Faq_cat>({
    name: { type: String, default: ''},
    messo_name: { type: String, default:''},
    lower_name: { type: String, default:''},
    lower_messo_name: { type: String, default:''},
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export const faq_catModel = model<Faq_cat>('faq_cats', schema);