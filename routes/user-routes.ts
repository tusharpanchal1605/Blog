import express from 'express';

import { create,findAll,deleteUser,updateUser,login} from '../controller/user-controller';
import { staticTokenValidate, validateToken } from '../middleware/validate-token-handler';
import { checkAdmin } from '../middleware/check-admin';
import { userCreateValidation, userLoginValidation } from '../middleware/validation';
import { verifyOTP } from '../controller/otp-controller';

const router = express.Router();
router.post('/',staticTokenValidate,userCreateValidation,create)
router.get('/',validateToken,checkAdmin,findAll)
router.post('/login',staticTokenValidate,userLoginValidation,login);
router.post("/verify-otp",staticTokenValidate,verifyOTP)
router.delete('/:userId',validateToken,checkAdmin,deleteUser);
router.put('/:userId',validateToken,checkAdmin,updateUser)
export default router;
