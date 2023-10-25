import { userModel, userSessionModel, deliveryPersonModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { identityGenerator } from '@utils/helpers';
import mongoose  from 'mongoose';
const jwt = require('jsonwebtoken');
import moment, { lang } from 'moment-timezone';
import { resolve } from 'path';
import { reject } from 'promise';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Delivery Boy
 * 
 * @param  
 * @returns 
 */
// login delivery boy
function deliveryBoyLogin(body: any, headers: any, deviceip: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { phoneNumber, countryCode, role = "user" } = body;
            const { devicetoken, devicetype, timezone, language, currentversion } = headers;
            var message: any = messages(language);
            const userData: any = await deliveryPersonModel.findOne({
                phoneNumber,
                countryCode
            })
            if (!userData) {
                reject(new CustomError(message.noSuchAccountExist, StatusCodes.BAD_REQUEST))
            } else if (!userData.isPhoneVerified) {
                if (role == 'vendor')
                    reject(new CustomError(message.accountUnverifiedAdmin, StatusCodes.UNAUTHORIZED))
                else
                    reject(new CustomError(message.accountUnverifiedAdmin, StatusCodes.UNAUTHORIZED))
            }
            if (userData.isActive == false) {
                reject(new CustomError(message.accountBlocked, StatusCodes.UNAUTHORIZED))
            }

            const token: string = jwt.sign({
                id: userData.id,
                role:'delivery'
            }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' })
            const sessionObj = {
                deviceType: devicetype,
                deviceIp: deviceip,
                timezone: timezone,
                language: language,
                currentVersion: currentversion,
                deviceToken: devicetoken,
                role: 'delivery',
                jwtToken: token,
                userId: userData.id
            }
            // Login for single or multiple device and limited device
            // await userSessionModel.updateMany({"userId": userData.id}, { $set: { "isActive" : false } })
            await userSessionModel.create(sessionObj)

            resolve({
                token,
                name: userData.name,
                image: userData?.image,
                email: userData.email,
                _id: userData._id,
                countryCode: userData.countryCode,
                phoneNumber: userData.phoneNumber,
                message: message.loginSuccessful
            })


        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}

// Check delivery boy 
function checkAccount(user: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { phoneNumber, countryCode, role } = user;
            const { language } = headers;
            var message: any = messages(language);
            const userData: any = await deliveryPersonModel.findOne({
                phoneNumber,
                countryCode
            });
            if (!userData) {
                resolve({ isUser: false, message: message.noSuchAccountExist })
            } else {
                if (userData.isActive) {
                    resolve({ isUser: true, isVerified: userData.isPhoneVerified })
                } else {
                    reject(new CustomError(message.accountBlocked, StatusCodes.UNAUTHORIZED))
                }
            }
        } catch (err) {
            reject(err)
        }
    });
}

// Logout delivery boy
function logOut(headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const token = headers.authorization
            const { language } = headers;
            var message: any = messages(language);
            await deliveryPersonModel.deleteOne({ jwtToken: token })
            resolve({ success: true, message: message.logOutSuccessful })
        } catch (err) {
            reject(err)
        }
    });
}

// Edit delivery boy profile
function EditDeliveryProfile(data: any, userId: any, image: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var dBoy: any = await deliveryPersonModel.findOne({'_id':userId});
            if(dBoy){
                var obj: any = {
                    'name':data.name ? data.name : dBoy.name,
                    'countryCode':data.countryCode ? data.countryCode : dBoy.countryCode,
                    'phoneNumber':data.phoneNumber ? data.phoneNumber : dBoy.phoneNumber,
                    'image': image[0].path ? image[0].path : dBoy.image
                }
                await deliveryPersonModel.updateOne({'_id':userId},obj);
                var Persondata = await deliveryPersonModel.findOne({'_id':userId});
                resolve({result:Persondata});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Update online status
function UpdateStatusByDeliveryPerson(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var dPerson: any = await deliveryPersonModel.findOne({'_id':userId});
            if(dPerson){
                var obj: any = {
                    'status':data.status
                }
                await deliveryPersonModel.updateOne({'_id':userId},obj);
                resolve({'result':{}});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Update notification status
function UpdateNotificationStatusByDeliveryBoy(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject) =>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var dPerson: any = await deliveryPersonModel.findOne({'_id':userId});
            if(dPerson){
                var obj: any = {
                    'notificationStatus':data.notificationStatus
                }
                await deliveryPersonModel.updateOne({'_id':userId},obj);
                resolve({'result':{}});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Update language by delivery boy
function UpdateLanguageByDeliveryBoy(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var dPerson: any = await deliveryPersonModel.findOne({'_id':userId});
            if(dPerson){
                var obj: any = {
                    'language':data.language
                }

                await deliveryPersonModel.updateOne({'_id':userId},obj);
                resolve({'result':{}});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}

// Update location by delivery body
function UpdateLocationByDeliveryBoy(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.lat || !data.long){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var dPerson: any = await deliveryPersonModel.find({'_id':userId});
            if(dPerson){
                var obj: any = {
                    'lat':data.lat ? data.lat : dPerson.lat,
                    'long':data.long ? data.long : dPerson.long
                }
                await deliveryPersonModel.updateOne({'_id':userId},obj);
                resolve({'result':{}});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}


// Export default
export default {
    deliveryBoyLogin,
    checkAccount,
    logOut,
    EditDeliveryProfile,
    UpdateStatusByDeliveryPerson,
    UpdateNotificationStatusByDeliveryBoy,
    UpdateLanguageByDeliveryBoy,
    UpdateLocationByDeliveryBoy
} as const;