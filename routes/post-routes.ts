import express from 'express';
import { Request, Response } from 'express';
import { createPost, deletePost, findAllPost, updatePost} from '../controller/post-controller';
import { staticTokenValidate, validateToken } from '../middleware/validate-token-handler';
import { createPostValidation, userCreateValidation, userLoginValidation } from '../middleware/validation';


const router = express.Router();


router.get('/',validateToken,findAllPost)
router.post('/',validateToken,createPostValidation,createPost);

router.delete('/:postId', validateToken, deletePost);
router.put('/:postId', validateToken,createPostValidation,updatePost);
export default router;
