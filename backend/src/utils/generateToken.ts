import jwt from "jsonwebtoken"
import {Response} from "express"

const generateToken =(userId:string,response:Response)=>{
const jwt_token =jwt.sign({userId},process.env.JWT_SECRET!,{
    expiresIn:"2d"
});
response.cookie("jwt",jwt_token,{
    maxAge:2*24*60*60*1000,
    httpOnly:true,
    sameSite:true,
    secure: process.env.NODE_ENV !== "development"
    //secure :true or false based on the Node environment
})
return jwt_token;
}

export default generateToken;
