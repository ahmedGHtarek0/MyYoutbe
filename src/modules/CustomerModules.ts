import mongoose,{Schema,Document} from "mongoose";
interface ICust extends Document{
    name:string,
    email:string,
    password:string,
    profilePicture:string,
    smallProfilePicture:string
}
const schema= new Schema<ICust>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profilePicture:{type:String,default:'any deafult pic'},
    smallProfilePicture:{type:String,default:'any small deafult pic'},
})

export const CustDB= mongoose.model<ICust>('Customer',schema)