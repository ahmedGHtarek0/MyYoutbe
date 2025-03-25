import { CustDB } from "../modules/CustomerModules"
import jwt from 'jsonwebtoken'
interface signup{
name?:string,
email:string,
password:string
}
export const signupCust=async({name,email,password}:signup)=>{
const makesure= await CustDB.findOne({email})
if(makesure){
    return({data:'the email is already exits',status:401})
}
const addnewCust= await CustDB.create({name,email,password})
await addnewCust.save()
return({data:Jwt({email}),status:200})
}
export const loginCust=async({email,password}:signup)=>{
const makesure= await CustDB.findOne({email})
if(!makesure){
    return({data:'the email is  Not  exits',status:401})
}
if(makesure.password!==password){
    return({data:'the password is  Not  exits',status:401})

}
return({data:Jwt({email}),status:200})
}
const Jwt=(data:any)=>{
return(jwt.sign(data,'Customer'))
}