import mongoose from "mongoose"
import { CommenstDB } from "../modules/Comments"
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
interface parentPost{
    content:string,
    idOfVidorpost:string,
    id:string,
    idofparent?:string
}
export const addparentcomments=async({content,idOfVidorpost,id}:parentPost)=>{
    try{
    const postmakesure= await Post.findOne({_id:idOfVidorpost})
    const writermakesure= await CustDB.findOne({_id:id})
    if(!writermakesure){
        return({data:'something wrong',status:401})
    }
    if(!postmakesure){
        return({data:'the post was deleted',status:401})
    }
    const addparentpost= await CommenstDB.create({nameOfWriter:writermakesure.name,content:content,idOfVidorpost:idOfVidorpost})
    await addparentpost.save()
    return{data:addparentpost,status:201}
}catch(err){
    return({data:err,status:401})
}
}
export const addnestedComments=async({content,idOfVidorpost,id,idofparent}:parentPost)=>{
    try{
    const postmakesure= await Post.findOne({_id:idOfVidorpost})
    const writermakesure= await CustDB.findOne({_id:id})
    const commnetmakesure= await CommenstDB.findOne({_id:idofparent})
    if(!commnetmakesure){
        return({data:'the comments was deleted',status:401})
    }
    if(!writermakesure){
        return({data:'something wrong',status:401})
    }
    if(!postmakesure){
        return({data:'the post was deleted',status:401})
    }
    const addparentpost= await CommenstDB.create({nameOfWriter:writermakesure.name,content:content,idOfVidorpost:idOfVidorpost,idofparent:idofparent})
    await addparentpost.save()
    return{data:addparentpost,status:201}
}catch(err){
    return({data:err,status:401})
}
}

export const getAllComments = async () => {
    try {
      // Find all top-level comments (those with `idofparent: null`)
      const topLevelComments = await CommenstDB.find({ idofparent: null });
  
      // Recursively fetch child comments for each top-level comment
      const commentsWithChildren = await Promise.all(
        topLevelComments.map(async (comment) => {
          const childComments = await getNestedComments(comment._id);  // Get nested comments
          return {
            ...comment.toObject(),  // Convert to plain object
            children: childComments,  // Add child comments as 'children'
          };
        })
      );
  
      return commentsWithChildren;
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  // Helper function to recursively get nested comments
  const getNestedComments = async (parentId:any) => {
    const childComments = await CommenstDB.find({ idofparent: parentId });
  
    if (childComments.length === 0) {
      return [];
    }
  
    // For each child comment, recursively find its own children
    const commentsWithChildren = await Promise.all(
      childComments.map(async (comment:any) => {
        const nestedChildren:any = await getNestedComments(comment._id);  // Get further nested comments
        return {
          ...comment.toObject(),
          children: nestedChildren,  // Add children to current comment
        };
      })
    );
  
    return commentsWithChildren;
  };
  