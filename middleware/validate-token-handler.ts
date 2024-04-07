import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { Request as ExpressRequest,Response, NextFunction } from 'express';
import  response  from '../util/common-response';

import { User } from "../models/user-model";
import 'dotenv/config'
interface RequestWithUser extends ExpressRequest {
    user?: any; 
}

export const validateToken = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token;
    let authHeader: any = req.headers.Authorization || req.headers.authorization;
    let startsWith = "Bearer";
    console.log("AuthHEader:",authHeader);
    console.log("check authheader:",authHeader && authHeader.indexOf(startsWith) === 0);
    try{
    if (authHeader && authHeader.indexOf(startsWith) === 0) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err: any, decoded: any) => {
            console.log("error:",err);
            if (err) {
                res.status(401).json({ error: 'user not authorized' });
            } else {
                console.log("USER : ",decoded.user);
                console.log("USER EMAIL: ",decoded.user.email);
                const email=decoded.user.email;
                const userExists = await User.findOne({ where:{email} });
                console.log("Checking userExist:",userExists);
                if(!userExists){
                    console.log("User not authorized");
                    return response.unAuthorizedRequest(res);
                }
                else{
                    console.log("Else part")
                    req.user = decoded.user;
                    console.log(req.user);
                    next();
                }
                
            }
        });
    } else {
        return response.unAuthorizedRequest(res);
    }
}
    catch(error){
        console.error('Error creating user:', error);
        return response.failureResponse(res);
    }
});

export const staticTokenValidate = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log("static token")
    let token;
    let authHeader: any = req.headers.Authorization || req.headers.authorization;
    let startsWith = "Bearer";
    console.log("AuthHEader:",authHeader);
    console.log("check authheader:",authHeader && authHeader.indexOf(startsWith) === 0);
    try{
    if (authHeader && authHeader.indexOf(startsWith) === 0) {
        token = authHeader.split(" ")[1];
        console.log("token",token);
        if(token===process.env.STATIC_TOKEN){
            next();
        }
        else{
           return response.invalidToken(res);
        }
    } else {
       return response.unAuthorizedRequest(res);
    }
}
    catch(error){
        console.error('Error creating user:', error);
        return response.failureResponse(res)
    }
});

