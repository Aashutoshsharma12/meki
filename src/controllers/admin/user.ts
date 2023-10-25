import { userModel } from '@models/index';
import mongoose from 'mongoose';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { errors } from '@constants';
import { messages } from "@Custom_message";
const ObjectId = mongoose.Types.ObjectId;
/**
 * User register 
 * 
 * @param body 
 * @returns 
 */


//***********Edit Vendor Profile*********/
function editVendor(body: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { countryCode, phoneNumber } = body
            const userData: any = await userModel.findOne({ countryCode: countryCode, phoneNumber: phoneNumber, isDelete: false, _id: { $ne: body.vendorId } });
            if (userData) {
                reject(new CustomError(errors.en.accountAlreadyExist, StatusCodes.BAD_REQUEST))
            } else {
                if (image) {
                    body = {
                        ...body,
                        image: image[0].path
                    }
                }
                await userModel.updateOne({ _id: body.vendorId }, body, { new: true });
                resolve({ success: true })
            }
        } catch (err) {
            reject(err)
        }
    });
}

//****Users List****/
function getUsers(query: any, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            const { page = 1, perPage = 10, search, status } = query;
            let condition: any = {
                isDelete: false, role: "user"
            };
            if (search && search != '') {
                condition = {
                    ...condition,
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } },
                    ],
                }
            };
            if (status) {
                condition = {
                    ...condition,
                    isActive: status
                }
            };

            // if already into array not push and not then push
            // await userModel.updateOne({ _id: "65117596a7a675b2967ead65" }, { $addToSet: { itemId: new ObjectId("6528d808521323b339fdfcf1") } })
            //remove from array using query
            // await userModel.updateOne({ _id: "65117596a7a675b2967ead65" }, { $pull: { itemId: new ObjectId("6528d808521323b339fdfcf1") } })
            //Increment and Decrement key value using query
            // await userModel.updateOne({ _id: "65117596a7a675b2967ead65" }, { $inc: { totalBranch:1} })

            const response: any = await userModel.find(condition, { name: 1, isActive: 1, isDelete: 1, createdAt: 1, email: 1, phoneNumber: 1, role: 1 }).skip(Number(page - 1) * Number(perPage))
                .limit(Number(perPage)).sort({ createdAt: -1 });
            const count = await userModel.count(condition);
            resolve({ response, count, });

        } catch (err) {
            reject(err)

        }
    });
}

//****User Detail By Id*****/
function userProfile(userId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userModel.findOne({ "_id": userId })
            if (!response) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                resolve(response)
            }
        } catch (err) {
            reject(err)

        }
    });
}

//***** Delete Category*****/
function deleteUser(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId } = body
            if (!userId) {
                reject(new CustomError('UserId required', StatusCodes.BAD_REQUEST));
            } else {
                const userData: any = await userModel.findOne({ _id: userId });
                if (!userData) {
                    reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
                } else {
                    await userModel.updateOne({ _id: userId }, { isDelete: true }, { new: true });
                    resolve({ success: true })
                }
            }

        } catch (err) {
            reject(err)
        }
    });
}

//*********Vendor Status Change****** */
function vendorStatus(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { status, vendorId } = query
            if (!status) {
                reject(new CustomError('Status Required', StatusCodes.BAD_REQUEST))
            } else {
                const userData: any = await userModel.findOne({ _id: vendorId });
                if (!userData) {
                    reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
                } else {
                    await userModel.updateOne({ _id: vendorId }, { vendor_status: status });
                    resolve({ success: true });
                }
            }
        } catch (err) {
            reject(err)
        }
    });
}

//****User List for Excel data Export *****/
function userExcelList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let condition: any = {
                isDelete: false,
                role: "user"
            }
            let response1 = await userModel.find(condition, { name: 1, email: 1, countryCode: 1, phoneNumber: 1 }).sort({ createdAt: -1 })
            let response = response1.map(user => {
                return {
                    identity: user._id ? user._id : "N/A", name: user.name ? user.name : "N/A", email: user.email ? user.email : "N/A", countryCode: user.countryCode ? user.countryCode : "N/A", phoneNumber: user.phoneNumber ? user.phoneNumber : "N/A",
                }
            })
            if (!response) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                resolve(response)
            }
        } catch (err) {
            reject(err)

        }
    });
}

//vendor list
function vendorList(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10, search, status } = query;
            let condition: any = {
                isDelete: false, branchType: 'Main', role: "vendor"
            };
            if (search && search != '') {
                condition = {
                    ...condition,
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } },
                    ],
                }
            };
            if (status) {
                condition = {
                    ...condition,
                    vendor_status: status
                }
            };

            const response: any = await userModel.find(condition, { branchNo: 1, vendor_status: 1, name: 1, isActive: 1, isDelete: 1, image: 1, restaurantName: 1, phoneNumber: 1, role: 1, countryCode: 1 }).skip(Number(page - 1) * Number(perPage))
                .limit(Number(perPage)).sort({ createdAt: -1 });
            const count = await userModel.count(condition);
            resolve({ response, count, });

        } catch (err) {
            reject(err)

        }
    });
}

//vendorDetails
function vendorDetails(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { vendorId } = query
            if (!vendorId) {
                reject(new CustomError("VendorId required", StatusCodes.BAD_REQUEST))
            };
            const profile_details = await userModel.findOne({ _id: vendorId });
            resolve({ profile_details: profile_details });
        } catch (err) {
            reject(err);
        }
    })
}

// Export default
export default {
    editVendor,
    getUsers,
    userProfile,
    vendorStatus,
    deleteUser,
    userExcelList,
    vendorList,
    vendorDetails
} as const;
