import mongoose,{Schema,Document} from "mongoose"
interface Icomments extends Document{
    nameOfWriter:string,
    content:string,
    idofparent: mongoose.Types.ObjectId|null,
    idOfVidorpost: mongoose.Types.ObjectId|null,
    likes:number
}
const scema= new Schema<Icomments>({
    nameOfWriter:{type:String,required:true},
    content:{type:String,required:true},
    idofparent:{type:Schema.Types.ObjectId,ref:'Comments',default:null},
    idOfVidorpost:{type:Schema.Types.ObjectId,ref:'Post',required:true},
    likes:{type:Number,default:0}
})

export const CommenstDB= mongoose.model<Icomments>('Comments',scema)