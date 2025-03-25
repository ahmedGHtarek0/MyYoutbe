import express, { response, Router } from 'express';
import { loginCust, signupCust } from '../services/Customer';
import { Customermiddlewares } from '../middlewares/CustomerMiddlewres';

const route=express.Router()
route.post('/signup',async(req,res)=>{
    try{
    const{name,email,password}=req.body
    const {data,status}= await signupCust({name,email,password})
    res.status(status).send(data)
    }catch(err){
        res.status(401).send('the err in the CustomerAUth.ts in signup Route '+err)
    }
})

route.post('/login',async(req,res)=>{
    try{
    const{email,password}=req.body
    const {data,status}= await loginCust({email,password})
    res.status(status).send(data)
    }catch(err){
        res.status(401).send('the err in the CustomerAUth.ts in login Route '+err)
    }
})
route.post('/test',Customermiddlewares,async(req:any,res)=>{
    try{
    const e= req.customer._id
    res.send(e)
    }catch(err){
        res.status(401).send('the err in the middlewares')
    }
})
export default route