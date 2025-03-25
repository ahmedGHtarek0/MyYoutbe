import { NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { CustDB } from "../modules/CustomerModules";
export const Customermiddlewares=(req:any,res:any,next:NextFunction)=>{
    try{
const auth= req.get('authorization')
if(!auth){
    throw new Error('where the authorization headers');
}
const token =auth.split(' ')[1]
if(!token){
    throw new Error("where is the token");
}
jwt.verify(token,'Customer',async(err:any,payload:any)=>{
    if(err){
        throw new Error("token is expired ");
        return 
    }
    try{
    const cust= await CustDB.findOne({email:payload.email})
    if(!cust){
        throw new Error("the user is deleted");
    }

    req.customer=cust
    next()
}catch(err:any){
    res.status(401).send(err.message)
}
})
    }catch(err:any){
        res.status(401).send(err.message)
    }
}