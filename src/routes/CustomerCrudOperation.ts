import express from 'express'
import { Customermiddlewares } from '../middlewares/CustomerMiddlewres'
import { cloude } from '../middlewares/picturemiddlewares'
import { addnestedComments, addNewPost, addparentcomments, addprofpics, deletedpicsodprof, getAllComments, updatepost } from '../services/CustomerCrude'
import Post from '../modules/post'
import mongoose from 'mongoose'
import { CommenstDB } from '../modules/Comments'

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
route.post('/addpost',Customermiddlewares,cloude.array('image',5),async(req:any,res)=>{
    try{
        const nameOfOwner=req.customer.name
        const {typestring}=req.body
        const pics=req.files.map((file:any)=>file.path)
        const {data,status}= await addNewPost({nameOfOwner,typestring,pics})
        res.status(status).send(data)
    }catch(err){
        res.status(401).send(err)
    }
})
route.post('/updatepost/:postid',Customermiddlewares,cloude.array('image',5),async(req:any,res)=>{
    try{
        const postid:string=req.params.postid
        const nameOfOwner=req.customer.name
        const {typestring}=req.body
        const pics=req.files.map((file:any)=>file.path)
        const {data,status}= await updatepost({nameOfOwner,typestring,pics,postid})
        res.status(status).send(data)
    }catch(err){
        res.status(401).send(err)
    }
})
route.post('/addlike/:postid',Customermiddlewares,async(req:any,res)=>{
    const postid:string=req.params.postid
    const addlikes= await Post.findById(postid)
    if(!addlikes){
        res.status(401).send('the post was deletd')
        return
    }
    addlikes.likes+=1
    await addlikes?.save()
    res.status(201).send(addlikes)
})
route.post('/deletelike/:postid',Customermiddlewares,async(req:any,res)=>{
    const postid:string=req.params.postid
    const addlikes= await Post.findOne({_id:postid})
    if(!addlikes){
        res.status(401).send('the post was deletd')
        return
    }
    addlikes.likes-=1
    await addlikes?.save()
    res.status(201).send(addlikes)
})
route.delete('/deletepost/:postid',Customermiddlewares,async(req:any,res)=>{
    try{
    const postid:string=req.params.postid
    const addlikes= await Post.findOneAndDelete({_id:postid})
    res.status(201).send('deleted')
    }catch(err){
        res.status(401).send(err)
    }
})
route.post('/addparentComments/:idOfVidorpost',Customermiddlewares,async(req:any,res)=>{
    try{
    const {content}=req.body
    const {idOfVidorpost}=req.params
    const id= req.customer._id
    const {data,status}=await addparentcomments({content,idOfVidorpost,id})
    res.status(status).send(data)
    }catch(err){
        res.status(401).send(err)
    }
})
route.post('/addnestedcomments/:idOfVidorpost/:idofparent',Customermiddlewares,async(req:any,res)=>{
    try{
    const {content}=req.body
    const {idOfVidorpost,idofparent}=req.params
    const id= req.customer._id
    const {data,status}=await addnestedComments({content,idOfVidorpost,id,idofparent})
    res.status(status).send(data)
    }catch(err){
        res.status(401).send(err)
    }
})
route.post('/addlikeC/:postid',Customermiddlewares,async(req:any,res)=>{
    const postid:string=req.params.postid
    const addlikes= await CommenstDB.findById(postid)
    if(!addlikes){
        res.status(401).send('the comments was deletd')
        return
    }
    addlikes.likes+=1
    await addlikes?.save()
    res.status(201).send(addlikes)
})
route.post('/deletelikec/:postid',Customermiddlewares,async(req:any,res)=>{
    const postid:string=req.params.postid
    const addlikes= await CommenstDB.findOne({_id:postid})
    if(!addlikes){
        res.status(401).send('the comments was deletd')
        return
    }
    addlikes.likes-=1
    await addlikes?.save()
    res.status(201).send(addlikes)
})
route.get('/getallcomments',async(req,res)=>{
    try{
   const x= await getAllComments()
      res.send(x)
    }catch(err){
        res.send(err)
    }
})
export default route