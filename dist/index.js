"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("./pre-start"); // Must be the first import
const jet_logger_1 = __importDefault(require("jet-logger"));
const server_1 = __importDefault(require("./server"));
const { createServer } = require("http");
const { Server } = require("socket.io");
// Constants
const serverStartMsg = 'Express server started on port: ', port = (process.env.PORT || 3000);
const httpServer = createServer(server_1.default);
// Start server
httpServer.listen(port, () => {
    jet_logger_1.default.info(serverStartMsg + port);
    console.log(serverStartMsg + port);
});
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
    pingTimeout: 60000,
    transport: 'polling'
});
var events = require('events');
const eventEmitter = new events.EventEmitter();
setTimeout(() => {
    require('./utils/socketHandler')(eventEmitter);
}, 10);
module.exports = {
    io: io
};
