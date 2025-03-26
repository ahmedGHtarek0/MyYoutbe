import express from 'express'
import { Customermiddlewares } from '../middlewares/CustomerMiddlewres'
import { cloude } from '../middlewares/picturemiddlewares'
import { addprofpics, deletedpicsodprof } from '../services/CustomerCrude'

const route= express.Router()
route.post('/addandupdatepics',Customermiddlewares,cloude.fields([{name:'smallpic',maxCount:1},{name:'bigpic',maxCount:1}]),async(req:any,res)=>{
    try{
    const smallpic=req.files.smallpic[0].path
    const bigpic=req.files.bigpic[0].path
    const id= req.customer._id
    console.log(id,smallpic,bigpic)
    const {data,status}= await addprofpics({smallpic,bigpic,id})
    res.status(status).send(data)
    }catch(err){
        res.status(401).send(err)
    }
})
route.delete('/deletepics',Customermiddlewares,async(req:any,res)=>{
    try{
    const {N}=req.body
    const id =req.customer._id
    const {data,status}=await deletedpicsodprof({id,N})
    res.status(status).send(data)
    }catch(err){
        res.status(401).send(err)
    }
})
export default route