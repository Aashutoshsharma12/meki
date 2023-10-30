import { Schema, model } from 'mongoose';

var messageSchema = new Schema({
    roomId: { type: String },
    message: { type: String },
    messageType: { type: String, default: 'text' },
    readStatus: {
        type: Boolean,
        default: false
    },
    sendFrom: {
        type: String,
        default: 'user'
    },
    sendTo: {
        type: String,
        default: 'delivery_boy'
    },
    date:{
        type: Date,
        default: new Date()
    },
    timestamp: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
});

const messageModel = model('Message', messageSchema);

export=  messageModel