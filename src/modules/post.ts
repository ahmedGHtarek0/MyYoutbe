import mongoose,{Schema,Document} from "mongoose";
interface iPost extends Document{
    nameOfOwner:string,
    typestring:string,
    pics:string[],
    likes:number
}
const schema= new Schema<iPost>({
    nameOfOwner:{type:String,required:true},
    typestring:{type:String,required:true},
    pics:{type:[String],default:[]},
    likes:{type:Number,default:0,required:true}
})
const Post= mongoose.model<iPost>('Post',schema)
export default Post