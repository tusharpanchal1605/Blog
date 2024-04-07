import otpGenerator from 'otp-generator';
import {OTP} from '../models/otp-model'; 
import { Request, Response } from 'express';
import { User } from '../models/user-model';
//import { mailSender } from '../utill/mailsender';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import HttpStatus from 'http-status-codes';
import response from '../util/common-response';


export const sendOTP = async (req: Request, res: Response) => {
    try {
      console.log("OTP api"); 
      const { email } = req.body;
      const existingOTP = await OTP.findOne({ where: { email } });
  
     
    if (existingOTP) {
        await existingOTP.destroy();
    }
  
      // Generate new OTP
    const otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        lowerCaseAlphabets: false, 
        specialChars: false 
    });
      
    const otpPayload:any = { email, otp };
    //save data in db
    await OTP.create(otpPayload);
  
      // Send OTP via email
    const title = 'Your OTP';
    const body = `Your OTP is: ${otp}`;
    const transporter = nodemailer.createTransport({
        //   host: process.env.MAIL_HOST,
        service:"gmail",
        port:4000,
        auth: {
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    // Send emails to users
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${email}`,
        subject: `title`,
        html: body,
    };
      
         
    const info = await transporter.sendMail(mailOptions);
    console.log("Email info: ", info);
  
      
     return response.otpSent(res);
    } catch (error) {
      console.error(error);
     
      return response.failedOtp(res);
    }
  };

export const verifyOTP=async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        console.log(`ENTERED INTO verify OTP API `);
        
        const otpData = await OTP.findOne({ where: { email } });
       
        console.log("CHECKING Email EXIST:",{otp});
        console.log("otp user enter:",otpData)
        if (!otpData) {
          return response.recordNotFound;
        }

        console.log(otp!==otpData.dataValues.otp)
        if (otp!==otpData.dataValues.otp) {
          return response.otpNotMatch(res);
        }
    const user:any = await User.findOne({ where:{email} });
        
    
    if (!user) {
      return response.recordNotFound(res);
      
    }
   
    
    // Generate JWT token
    const accessToken = jwt.sign({
        user: {
          firstName: user.first_name,
          email: user.email,
          id: user.id,
          isAdmin:user.isAdmin
        },
      }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "50d" });
    
   

    console.log("SUCCESSFULLY GENERATE TOKEN AND LOGIN SUCCESSFULLY");
    
    return res.status(HttpStatus.OK).json({msg:'OTP successfully verified and login token generated', status:true, accessToken});
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
  };
