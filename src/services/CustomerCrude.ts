import { CustDB } from "../modules/CustomerModules"
import Post from "../modules/post"

interface profpics{
    smallpic?:string,
    bigpic?:string,
    id:string,
    N?:number
}
export const addprofpics=async({smallpic,bigpic,id}:profpics)=>{
    try{
    const  finduser= await CustDB.findOneAndUpdate({_id:id},{$set:{profilePicture:bigpic,smallProfilePicture:smallpic}},{ new: true } )
    await finduser?.save(),{ new: true } 
    return({data:finduser,status:201})
    }catch(err:any){
        return({data:err.message,status:401})
    }
}
export const deletedpicsodprof=async({id,N}:profpics)=>{
    try{
        if(N===0){
            const deleteSmallpic= await CustDB.findByIdAndUpdate({_id:id},{$set:{smallProfilePicture:'defult'}},{new:true})
            await deleteSmallpic?.save()
            return({data:deleteSmallpic,status:201})
        }
        else{
            const deleteSmallpic= await CustDB.findByIdAndUpdate({_id:id},{$set:{profilePicture:'defult'}})
            await deleteSmallpic?.save()
            return({data:deleteSmallpic,status:201})
        }
    }catch(err:any){
        return({data:err.message,status:401})
    }
}
interface post{
nameOfOwner:string,
typestring:string,
pics:string[],
postid?:string
}
export const addNewPost=async({nameOfOwner,typestring,pics}:post)=>{
    try{
    const addpost= await Post.create({nameOfOwner,typestring,pics})
    await addpost.save()
    return({data:addpost,status:201})
    }catch(err){
        return{data:err,status:401}
    }
}
export const updatepost=async({nameOfOwner,typestring,pics,postid}:post)=>{
    try{
        const  finduser= await Post.findOneAndUpdate({_id:postid},{$set:{nameOfOwner,typestring,pics}},{new:true})
        await finduser?.save(),{ new: true } 
        return({data:finduser,status:201})
        }catch(err:any){
            return({data:err.message,status:401})
        }
}
