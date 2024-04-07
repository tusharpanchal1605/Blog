import { User } from '../models/user-model';
import { Request, Response } from "express";
import response from '../util/common-response';
import bcrypt from 'bcrypt';
import HttpStatus, { BAD_REQUEST } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { sendOTP } from './otp-controller';
// import { sendOTP } from './otp-controller';

// Create 
export const create = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, isAdmin } = req.body;
    
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return response.alreadyExist(res);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ first_name, last_name, email, password: hashPassword, isAdmin });
    console.log(newUser); 
    await newUser.save(); 

    return response.successCreate(res);
  } catch (error) {
    console.error(error); 
    return response.failureResponse(res); 
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    console.log("Users",users)
    res.status(200).json({ users: users });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error finding users"
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.destroy({
      where: {
        id: userId
      }
    });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error deleting user"
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;
    const updatedEmail = req.body.email;
    const updatedPassword = req.body.password;
    let user:any = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.firstName = updatedFirstName;
    user.lastName = updatedLastName;
    user.email = updatedEmail;
    user.password = updatedPassword;
    await user.save();
    res.status(200).json({ message: 'User updated!', user: user });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error updating user"
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
     
      
      const user:any = await User.findOne({ where: { email } });
      console.log("CHECKING USEREXIST:", user);
      if (!user) {
          return response.recordNotFound(res);
      }
      
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
          return response.passwordResponse(res);
      }

      const otpResponse = await sendOTP(req, res); 
      console.log("OTP Response:", otpResponse);
    //   console.log("Secret key:",process.env.ACCESS_TOKEN_SECRET);
    //   console.log("first_name:",user.first_name)
    //   console.log("email:",user.email)
    //   console.log("id:",user.id);
    //    const accessToken = jwt.sign({
    //     user: {
    //       first_name: user.first_name,
    //       email: user.email,
    //       id: user._id,
    //       isAdmin:user.isAdmin
    //     },
    //   }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "50d" });
    //   console.log("SUCCESSFULLY GENERATE TOKEN AND LOGIN SUCCESSFULLY");
    
    //return res.status(HttpStatus.OK).json({msg:'OTP successfully verified and login token generated', status:true, accessToken});
  
      
  } catch (error) {
      
      return response.failureResponse(res);
  }
};

