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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let database;
const connect = () => {
    // add your own uri below
    const uri = process.env.MONGO_URI || '';
    if (database) {
        return;
    }
    mongoose_1.default.connect(uri);
    database = mongoose_1.default.connection;
    database.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Connected to database");
    }));
    // If the connection throws an error
    database.on("error", function (err) {
        console.error('Failed to connect to DB on startup ', err);
    });
    // When the connection is disconnected
    database.on('disconnected', function () {
        console.log('Mongoose default connection to DB disconnected');
    });
    var gracefulExit = function () {
        database.close(function () {
            console.log('Mongoose default connection with DB is disconnected through app termination');
            process.exit(0);
        });
    };
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
};
exports.connect = connect;
const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose_1.default.disconnect();
};
exports.disconnect = disconnect;
