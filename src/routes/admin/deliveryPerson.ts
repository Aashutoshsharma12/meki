import { Request,Response,NextFunction,Router } from "express";
import deliveryPersonController from "@controllers/admin/deliveryPerson";
import { StatusCodes } from "http-status-codes";
import upload from "@utils/multer";
import { checkRole, verifyAuthToken } from "@utils/authValidator";
import { messages } from "@Custom_message";
import { success } from "@constants";
import { schemaValidator, schemaValidator1 } from "@utils/schemaValidator";
import{edit,add,get} from '@validators/deliveryPerson'
const route = Router();
const{OK,CREATED} = StatusCodes

export const p = {
    add:'/add',
    edit:'/edit',
    get:'/get',
    list:'/list',
    delete:'/delete'
} as const

route.post(p.add,upload.fields([{name:'image',maxcount:1}]),verifyAuthToken,checkRole(['Admin']),schemaValidator(add),async(req:any,res)=>{
    console.log(req.files,"dldld")
    const data = await deliveryPersonController.addDeliveryPerson(req.body,req.files?.image);
    return res.status(CREATED).json({data,message:success.en.success,code:CREATED});
});

route.put(p.edit,upload.fields([{name:'image',maxcount:1}]),verifyAuthToken,checkRole(['Admin']),schemaValidator(edit),async(req:any,res)=>{
    const data = await deliveryPersonController.editDeliveryPerson(req.body,req.files?.image);
    return res.status(CREATED).json({data,message:success.en.success,code:CREATED});
});

route.get(p.get,verifyAuthToken,checkRole(['Admin']),schemaValidator1(get),async(req:any,res)=>{
    const data = await deliveryPersonController.getDeliveryPerson(req.query);
    return res.status(OK).json({data,message:success.en.recordFetched,code:OK});
})

route.get(p.list,verifyAuthToken,checkRole(['Admin']),async(req:any,res)=>{
    const data = await deliveryPersonController.listDeliveryPerson(req.query);
    return res.status(OK).json({data,message:success.en.recordFetched,code:OK});
})

route.delete(p.delete,verifyAuthToken,checkRole(['Admin']),schemaValidator1(get),async(req:any,res)=>{
    const data = await deliveryPersonController.deleteDeliveryPerson(req.query);
    return res.status(OK).json({data,message:success.en.success,code:OK});
})

export default route;

