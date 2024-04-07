import { Sequelize, DataTypes, UUIDV4} from 'sequelize';
import {db} from "../sequelize";
export const OTP=db.define('otp',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    
    otp:{
      type:DataTypes.INTEGER,
      allowNull: false,
      unique:true,
    }
})
//const otpTable=OTP.sync({force: true});
