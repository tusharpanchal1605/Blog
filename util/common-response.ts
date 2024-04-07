import HttpStatus, { BAD_REQUEST } from 'http-status-codes';
import { Response } from 'express';
import { BAD, Internal, OTP_NOT_MATCH, PASSWORD_NOT_MATCH, POST_UPDATE, RECORD_DELETED, RECORD_FOUND, RECORD_NOT_FOUND, RECORD_UPLOAD, SOMETHING_WENT_WRONG, TOO_MANY_REQUESTS, UNAUTHORIZED, UPDATE_PROFILE, USER_ALREADY_EXIST, USER_CREATED, USER_ID } from '../util/constant';
import { Message } from './constructor';


const successCreate = (res:Response)=>{
    return res.status(HttpStatus.OK).json(new Message(USER_CREATED,true));
}
const successDelete = (res:Response) => {
    res.status(HttpStatus.OK).json(new Message(RECORD_DELETED,true));
}
const successResponse = (res:Response) =>{
    (res.status(HttpStatus.OK).json(new Message(RECORD_UPLOAD,true)))
}
const passwordResponse=(res:Response)=>{
    res.status(HttpStatus.UNAUTHORIZED).json(new Message(PASSWORD_NOT_MATCH,false))
}
const failureResponse = (res:Response) =>{
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new Message(SOMETHING_WENT_WRONG,false,undefined,Internal));
} 

 
const recordNotFound = (res:Response) =>{
    return res.status(HttpStatus.NOT_FOUND).json(new Message(RECORD_NOT_FOUND,false));
}
const unAuthorizedRequest = (res:Response) =>{
    
}
const recordFound = (data:any,res:Response) =>{
    res.status(HttpStatus.OK).json(new Message(RECORD_FOUND,true,data))
}

const alreadyExist=(res:Response)=>{
    return res.status(HttpStatus.OK).json(new Message(USER_ALREADY_EXIST,false));
}
const userId=(res:Response)=>{
    res.status(HttpStatus.NOT_FOUND).json(new Message(USER_ID,false,undefined,"Not found")); ;
}
const updateProfile=(accessToken:any,res:Response)=>{
    (res.status(HttpStatus.OK).json(new Message(UPDATE_PROFILE,true,undefined,accessToken)));
}
const invalidToken=(res:Response)=>{
    (res.status(HttpStatus.UNAUTHORIZED).json(new Message("Invalid token",false)))
}
const postUpdate=(res:Response)=>{
    (res.status(HttpStatus.OK).json(new Message("post updated succesfully",true)))
}
const otpSent=(res:Response)=>{
     return res.status(HttpStatus.OK).json({
        success: 1,
        message: 'OTP sent successfully'
        
    });
}
const failedOtp=(res:Response)=>{
    res.status(500).json({ success: 0, msg: 'Failed to send OTP' });
}
const otpNotMatch=(res:Response)=>{
    res.status(HttpStatus.UNAUTHORIZED).json({success:0,msg:OTP_NOT_MATCH});
}
// const verifyOTP=(res:Response)=>{
//     res.status(HttpStatus.OK).json({success:1,msg:'OTP successfully verified and login token generated',data:accessToken)});
// }
const response = {
    successCreate,
    successResponse,
    failureResponse,
    
    recordNotFound,
    unAuthorizedRequest,        
    
    alreadyExist,
    passwordResponse,
    recordFound,
    successDelete,
    userId,
    updateProfile,
    invalidToken,
    postUpdate,
    otpSent,
    failedOtp,
    otpNotMatch,
}
export default response