import { messageModel, roomModel, orderModel, report_issue_messageModel } from '@models/index'
var { io } = require('../index');
const nsp = io.of('/meki');
const moment = require('moment-timezone');

export = async (eventEmitter: any) => {
    var addMessage = async function (data: any) {
        await messageModel.create(data);
    }

    var roomDisconnect = async function (room: any) {
        await roomModel.deleteOne({ 'roomId': room.room_id, 'userId': room.userId });
    }

    var updateLoc = async (data: any)=>{
        await orderModel.updateOne({'_id':data.roomId},{$push:{'tracking_loc':{'lat':data.locationPayload.lat,'long':data.locationPayload.long}}});
        await orderModel.updateOne({'_id':data.roomId},{'delivery_boy_last_loc':{'lat':data.locationPayload.lat,'long':data.locationPayload.long}});
    }

    var addReportMessage = async(data: any)=>{
        await new report_issue_messageModel(data).save();
    }

    /**
     * 
     * @param room 
     *  
    */
    var joinRoom = async function (room: any) {
        var roomObj = await roomModel.findOne({ 'roomId': room.roomId, roomType: room.roomType });
        console.log(roomObj);
        if (!roomObj) {
            await roomModel.create(room);
        }
    }

    nsp.on('connection', function (socket: any) {
        console.log("new user connected ----------------------", socket.id);
        // report & issue join room
        socket.on('join_room_report',function(room: any){
            socket.join(room.roomId);
        });

        // report & issue send message
        socket.on('send_message_report', function (data: any){
            var messageObj = {
                ...data,
                timestamp: moment.utc().unix()
            };
            addReportMessage(messageObj);
            socket.broadcast.to(data.roomId).emit('chat_message_report', messageObj);
        })

        socket.on('join_room', function (room: any) {
            joinRoom(room);
            socket.join(room.roomId);
        });

        socket.on('send_message', function (data: any) {
            var messageObj = {
                ...data,
                timestamp: moment.utc().unix()
            };
            addMessage(messageObj);
            socket.broadcast.to(data.roomId).emit('chat_message', messageObj);
        });

        socket.on("disconnect", function (room: any) {
            console.log('disconnect', room);
            roomDisconnect(room);
            socket.broadcast.to(room.roomId).emit('disconnected', {
                roomId: room.roomId
            });
        });

        socket.on('typing', function (room: any) {
            socket.broadcast.to(room.roomId).emit('user_typing', {
                message: 'typing.......',
            });
        });

        socket.on('track_join_room', function (room: any) {
            socket.join(room.roomId);
        });

        eventEmitter.on('send_location', (obj: any) => {
            socket.broadcast.to(obj.roomId).emit('live_location', obj.locationPayload);
            updateLoc(obj);
        });
    });
}
