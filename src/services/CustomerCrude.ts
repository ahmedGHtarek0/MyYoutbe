import { CustDB } from "../modules/CustomerModules"

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
