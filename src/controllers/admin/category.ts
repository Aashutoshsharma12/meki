import { errors } from "@constants";
import categoryModel from "@models/category";
import { CustomError } from "@utils/errors";
import { StatusCodes } from "http-status-codes";

/**
* List Category
*
* @query body
* @returns
*/

function listCat(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10 } = body
            const totalCount = await categoryModel.countDocuments({ isDelete: false });
            const data = await categoryModel.find({ isDelete: false }).sort({ createdAt: -1 }).skip((perPage * page) - perPage).limit(perPage);
            resolve({ data, totalCount: totalCount });
        } catch (err) {
            reject(err)
        }
    })
}

function getCat(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { catId } = query
            if (!catId) {
                reject(new CustomError(errors.en.categoryIdRequired, StatusCodes.BAD_REQUEST))
            }
            const data = await categoryModel.findOne({ isDelete: false, _id: catId });
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
* Add Category
*
* @body body
* @returns
*/

function addCat(body: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!image) {
                reject(new CustomError('Image required', StatusCodes.BAD_REQUEST))
            }
            const { name, meso_name } = body
            const lower_name = name.toLowerCase()
            const meso_lower_name = meso_name.toLowerCase()
            const obj = {
                ...body,
                lower_name,
                meso_lower_name,
                image: image.path ? image.path : ''
            }
            const check: any = await categoryModel.findOne({ lower_name: lower_name })
            if (check) {
                reject(new CustomError(errors.en.categoryWithSameName.replace(`{{catName}}`, name), StatusCodes.BAD_REQUEST))
            } else {
                const checkMeso_name: any = await categoryModel.findOne({ meso_lower_name: meso_lower_name })
                if (checkMeso_name) {
                    reject(new CustomError(errors.en.categoryWithSameName.replace(`{{catName}}`, meso_name), StatusCodes.BAD_REQUEST))
                } else {
                    const add = await categoryModel.create(obj);
                    resolve(add)
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}
/***
 * @query body
 * @returns
 */

function editCat(body: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, meso_name, catId } = body
            const lower_name = name.toLowerCase()
            const meso_lower_name = meso_name.toLowerCase()
            const obj = {
                ...body,
                lower_name,
                meso_lower_name
            }
            const check: any = await categoryModel.findById({ _id: catId, isDelete: false });
            if (image) {
                obj.image = image.path
            } else {
                obj.image = check.image
            }
            if (check) {
                const checkCatName: any = await categoryModel.findOne({ lower_name: lower_name, isDelete: false });
                if (checkCatName) {
                    if ((checkCatName._id).toString() == catId) {
                        const checkCat_mesoName: any = await categoryModel.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                        if (checkCat_mesoName) {
                            if ((checkCat_mesoName._id).toString() == catId) {
                                await categoryModel.updateOne({ _id: catId }, obj);
                                resolve({ success: true })
                            } else {
                                reject(new CustomError(errors.en.categoryWithSameName.replace(`{{catName}}`, meso_name), StatusCodes.BAD_REQUEST))
                            }
                        } else {
                            await categoryModel.updateOne({ _id: catId }, obj);
                            resolve({ success: true })
                        }
                    } else {
                        reject(new CustomError(errors.en.categoryWithSameName.replace(`{{catName}}`, name), StatusCodes.BAD_REQUEST))
                    }
                } else {
                    const checkCat_mesoName: any = await categoryModel.findOne({ meso_lower_name: meso_lower_name, isDelete: false });
                    if (checkCat_mesoName) {
                        if ((checkCat_mesoName._id).toString() == catId) {
                            await categoryModel.updateOne({ _id: catId }, obj);
                            resolve({ success: true })
                        } else {
                            reject(new CustomError(errors.en.categoryWithSameName.replace(`{{catName}}`, meso_name), StatusCodes.BAD_REQUEST))
                        }
                    } else {
                        await categoryModel.updateOne({ _id: catId }, obj);
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
function updateStatus(query: any, catId: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!catId.id) {
                reject(new CustomError(errors.en.categoryIdRequired, StatusCodes.BAD_REQUEST))
            }
            if (!query.isActive) {
                reject(new CustomError(errors.en.isActiveRequired, StatusCodes.BAD_REQUEST))
            }
            const check = await categoryModel.findOne({ _id: catId.id, isDelete: false });
            if (check) {
                await categoryModel.updateOne({ _id: catId.id }, { isActive: query.isActive });
                resolve({ success: true });
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            }

        } catch (err) {
            reject(err)
        }
    })
}

function deleteCat(catId: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await categoryModel.findOne({ _id: catId.id, isDelete: false });
            if (check) {
                await categoryModel.updateOne({ _id: catId.id }, { isDelete: true });
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
    listCat,
    getCat,
    addCat,
    editCat,
    updateStatus,
    deleteCat
} as const