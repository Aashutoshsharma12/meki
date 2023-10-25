import { errors } from "@constants";
import exploreModel from "@models/explore";
import { CustomError } from "@utils/errors";
import { StatusCodes } from "http-status-codes";

/**
* List Explore
*
* @query query
* @returns
*/

function exploreList(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10 } = query
            console.log(page, perPage)
            const totalCount = await exploreModel.countDocuments({ isDelete: false });
            const data = await exploreModel.find({ isDelete: false }).sort({ position: 1 }).skip((perPage * page) - perPage).limit(perPage);
            resolve({ data, totalCount: totalCount });
        } catch (err) {
            reject(err)
        }
    })
}

function getExplore(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { exploreId } = query
            if (!exploreId) {
                reject(new CustomError(errors.en.exploreIdRequired, StatusCodes.BAD_REQUEST))
            }
            const data = await exploreModel.findOne({ isDelete: false, _id: exploreId });
            if (data)
                resolve(data);
            else
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
        } catch (err) {
            reject(err)
        }
    })
}

/**
* Add Explore
*
* @query body
* @returns
*/

function addExplore(body: any, image1: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!image1) {
                reject(new CustomError('Image required', StatusCodes.BAD_REQUEST))
            }
            const { name, image, meso_name } = body
            const lower_name = name.toLowerCase()
            const meso_lower_name = meso_name.toLowerCase()
            const obj = {
                ...body,
                lower_name,
                meso_lower_name,
                image: image1[0].path
            }
            const check: any = await exploreModel.findOne({ lower_name: lower_name })
            if (check) {
                reject(new CustomError(errors.en.exploreWithSameName.replace(`{{exploreName}}`, name), StatusCodes.BAD_REQUEST))
            } else {
                const checkMeso_name: any = await exploreModel.findOne({ meso_lower_name: meso_lower_name })
                if (checkMeso_name) {
                    reject(new CustomError(errors.en.exploreWithSameName.replace(`{{exploreName}}`, meso_name), StatusCodes.BAD_REQUEST))
                } else {
                    const add = await exploreModel.create(obj);
                    resolve(add)
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}

/**
* Edit Explore
*
* @query body
* @returns
*/

function editExplore(body: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, meso_name, exploreId } = body
            const lower_name = name.toLowerCase()
            const meso_lower_name = meso_name.toLowerCase()
            const obj = {
                ...body,
                lower_name,
                meso_lower_name
            }
            const check: any = await exploreModel.findById({ _id: exploreId, isDelete: false });
            if (!image) {
                obj.image = check.image
            } else {
                obj.image = image[0].path
            }
            if (check) {
                const checkCatName: any = await exploreModel.findOne({ lower_name: lower_name, isDelete: false });
                if (checkCatName) {
                    if ((checkCatName._id).toString() == exploreId) {
                        const checkCat_mesoName: any = await exploreModel.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                        if (checkCat_mesoName) {
                            if ((checkCat_mesoName._id).toString() == exploreId) {
                                await exploreModel.updateOne({ _id: exploreId }, obj);
                                resolve({ success: true })
                            } else {
                                reject(new CustomError(errors.en.exploreWithSameName.replace(`{{exploreName}}`, meso_name), StatusCodes.BAD_REQUEST))
                            }
                        } else {
                            await exploreModel.updateOne({ _id: exploreId }, obj);
                            resolve({ success: true })
                        }
                    } else {
                        reject(new CustomError(errors.en.exploreWithSameName.replace(`{{exploreName}}`, name), StatusCodes.BAD_REQUEST))
                    }
                } else {
                    const checkCat_mesoName: any = await exploreModel.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                    if (checkCat_mesoName) {
                        if ((checkCat_mesoName._id).toString() == exploreId) {
                            await exploreModel.updateOne({ _id: exploreId }, obj);
                            resolve({ success: true })
                        } else {
                            reject(new CustomError(errors.en.exploreWithSameName.replace(`{{exploreName}}`, meso_name), StatusCodes.BAD_REQUEST))
                        }
                    } else {
                        await exploreModel.updateOne({ _id: exploreId }, obj);
                        resolve({ success: true })
                    }
                }
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            }
        } catch (err) {
            reject(err)
        }
    })
}
function updateStatus(query: any, exploreId: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!exploreId.id) {
                reject(new CustomError(errors.en.exploreIdRequired, StatusCodes.BAD_REQUEST))
            }
            if (!query.isActive) {
                reject(new CustomError(errors.en.isActiveRequired, StatusCodes.BAD_REQUEST))
            }
            const check = await exploreModel.findOne({ _id: exploreId.id, isDelete: false });
            if (check) {
                await exploreModel.updateOne({ _id: exploreId.id }, { isActive: query.isActive });
                resolve({ success: true });
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            }

        } catch (err) {
            reject(err)
        }
    })
}

function deleteExplore(exploreId: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await exploreModel.findOne({ _id: exploreId.id, isDelete: false });
            if (check) {
                await exploreModel.updateOne({ _id: exploreId.id }, { isDelete: true });
                resolve({ success: true });
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            }
        } catch (err) {
            reject(err)
        }
    })
}

export default {
    exploreList,
    getExplore,
    addExplore,
    editExplore,
    updateStatus,
    deleteExplore
} as const