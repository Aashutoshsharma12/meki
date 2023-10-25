import { Schema, model } from "mongoose"

interface Faq {
    question: string;
    messo_question: string;
    lower_question: string;
    lower_messo_question: string;
    answer: string;
    messo_answer: string;
    role: string;
    isActive: boolean;
    isDelete: boolean;
};

const schema = new Schema<Faq>({
    question: { type: String },
    messo_question: { type: String },
    lower_question: { type: String },
    lower_messo_question: { type: String },
    answer: { type: String },
    messo_answer: { type: String },
    role: { type: String, enum: ['customer', "businessOwner", "deliveryPerson"] },    //customer ,businessOwner, deliveryPerson
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export const faqModel = model<Faq>('faq', schema);