import { Router } from "express";
const router = Router();
import restaurantController from '../../controllers/admin/restaurant'
import { checkRole, verifyAuthToken } from "@utils/authValidator";
import { StatusCodes } from "http-status-codes";
import { success } from "@constants";
import upload from "@utils/multer";
import {schemaValidator} from "@utils/schemaValidator";
import { addResturant, add_branch, editResturant, editResturant_branch, updateStatus } from "@validators/restaurant";
const { OK, CREATED } = StatusCodes
export const p = {
    list: '/list',
    add: '/add',
    add_branch: '/add_branch',
    edit: '/edit',
    edit_branch:'/edit_branch',
    details: '/details',
    documents_upload: '/documents_upload',
    updateStatus: '/update_status',
    branch_list:'/branchList',
    documents_upload_body:'/upload_document'
}

router.get(p.list, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await restaurantController.list(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
})

router.post(p.add, upload.fields([{ name: 'restaurantImage', maxCount: 1 }, { name: 'branchImage', maxCount: 1 }]), verifyAuthToken, checkRole(['Admin']), schemaValidator(addResturant), async (req: any, res) => {
    const data = await restaurantController.addResturant(req.body, req.files?.restaurantImage, req.files?.branchImage);
    return res.status(CREATED).json({ message: success.en.addRestaurant, code: CREATED, data })
});

router.post(p.add_branch, upload.fields([{ name: 'branchImage', maxCount: 1 }]), verifyAuthToken, checkRole(['Admin']), schemaValidator(add_branch), async (req: any, res) => {
    const data = await restaurantController.addResturant_branch(req.body, req.files?.branchImage);
    return res.status(CREATED).json({ message: success.en.addRestaurant, code: CREATED, data })
});

router.get(p.branch_list, verifyAuthToken, checkRole(['Admin']), async (req, res) => {
    const data = await restaurantController.branchList(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data })
})

router.put(p.edit, upload.fields([{ name: 'restaurantImage', maxCount: 1 }]), verifyAuthToken, checkRole(['Admin']), async (req: any, res) => {
    const data = await restaurantController.editResturant(req.body, req.files?.restaurantImage);
    return res.status(CREATED).json({ message: success.en.updateSuccefully, code: CREATED, data })
})
router.put(p.edit_branch, upload.fields([{ name: 'branchImage', maxCount: 1 }]), verifyAuthToken, checkRole(['Admin']), schemaValidator(editResturant_branch), async (req: any, res) => {
    const data = await restaurantController.editResturant_branch(req.body, req.files?.branchImage);
    return res.status(CREATED).json({ message: success.en.updateSuccefully, code: CREATED, data })
})

router.get(p.details, verifyAuthToken, checkRole(['Admin']), async (req: any, res) => {
    const data = await restaurantController.details(req.query);
    return res.status(OK).json({ message: success.en.recordFetched, code: OK, data });
})

router.put(p.documents_upload, upload.fields([{ name: 'image', maxCount: 1 }]), verifyAuthToken, checkRole(['Admin']), async (req: any, res) => {
    const data = await restaurantController.documents_upload(req.body, req.files?.image);
    return res.status(CREATED).json({ message: success.en.doc_upload, code: CREATED, data })
})
router.post(p.documents_upload_body, verifyAuthToken, checkRole(['Admin']), async (req: any, res) => {
    const data = await restaurantController.documents_upload_body(req.body);
    return res.status(CREATED).json({ message: success.en.doc_upload, code: CREATED, data })
})

router.put(p.updateStatus, verifyAuthToken, checkRole(['Admin']), schemaValidator(updateStatus), async (req: any, res) => {
    const data = await restaurantController.updateStatus(req.body);
    return res.status(CREATED).json({ message: success.en.updateStatus, code: CREATED, data })
})


export default router;