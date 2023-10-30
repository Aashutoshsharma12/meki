"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const index_1 = require("../models/index");
var { io } = require('../index');
const nsp = io.of('/meki');
const moment = require('moment-timezone');
module.exports = (eventEmitter) => __awaiter(void 0, void 0, void 0, function* () {
    var addMessage = function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.messageModel.create(data);
        });
    };
    var roomDisconnect = function (room) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.roomModel.deleteOne({ 'roomId': room.room_id, 'userId': room.userId });
        });
    };
    var updateLoc = (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.orderModel.updateOne({ '_id': data.roomId }, { $push: { 'tracking_loc': { 'lat': data.locationPayload.lat, 'long': data.locationPayload.long } } });
        yield index_1.orderModel.updateOne({ '_id': data.roomId }, { 'delivery_boy_last_loc': { 'lat': data.locationPayload.lat, 'long': data.locationPayload.long } });
    });
    var addReportMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield new index_1.report_issue_messageModel(data).save();
    });
    /**
     *
     * @param room
     *
    */
    var joinRoom = function (room) {
        return __awaiter(this, void 0, void 0, function* () {
            var roomObj = yield index_1.roomModel.findOne({ 'roomId': room.roomId, roomType: room.roomType });
            console.log(roomObj);
            if (!roomObj) {
                yield index_1.roomModel.create(room);
            }
        });
    };
    nsp.on('connection', function (socket) {
        console.log("new user connected ----------------------", socket.id);
        // report & issue join room
        socket.on('join_room_report', function (room) {
            socket.join(room.roomId);
        });
        // report & issue send message
        socket.on('send_message_report', function (data) {
            var messageObj = Object.assign(Object.assign({}, data), { timestamp: moment.utc().unix() });
            addReportMessage(messageObj);
            socket.broadcast.to(data.roomId).emit('chat_message_report', messageObj);
        });
        socket.on('join_room', function (room) {
            joinRoom(room);
            socket.join(room.roomId);
        });
        socket.on('send_message', function (data) {
            var messageObj = Object.assign(Object.assign({}, data), { timestamp: moment.utc().unix() });
            addMessage(messageObj);
            socket.broadcast.to(data.roomId).emit('chat_message', messageObj);
        });
        socket.on("disconnect", function (room) {
            console.log('disconnect', room);
            roomDisconnect(room);
            socket.broadcast.to(room.roomId).emit('disconnected', {
                roomId: room.roomId
            });
        });
        socket.on('typing', function (room) {
            socket.broadcast.to(room.roomId).emit('user_typing', {
                message: 'typing.......',
            });
        });
        socket.on('track_join_room', function (room) {
            socket.join(room.roomId);
        });
        eventEmitter.on('send_location', (obj) => {
            socket.broadcast.to(obj.roomId).emit('live_location', obj.locationPayload);
            updateLoc(obj);
        });
    });
});
