import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/post-model';
import { User } from '../models/user-model';
import HttpStatus from 'http-status-codes';
import response from '../util/common-response';
import { any } from 'joi';


interface CustomRequest extends Request {
    user?: any; 
}
// Create Post
export const createPost = async (req: CustomRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return response.recordNotFound(res);
        }
        const author = `${user.dataValues.first_name} ${user.dataValues.lastName}`;
        const newUser = await Post.create({ title, description,author,userId });
        await newUser.save(); 
        return response.successResponse(res);
    } catch (error) {
        return response.failureResponse(res);
    }
};


// Get All Posts
export const findAllPost = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const posts = await Post.findAll({ where: { userId } });
        if (posts.length > 0) {
            return response.recordFound(posts, res);
        } else {
            return response.recordNotFound(res);
        }
    } catch (error) {
        return response.failureResponse(res);
    }
}


// Delete Post
export const deletePost = async (req: CustomRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByPk(postId);
        if (!post) {
        return res.status(404).json({ message: 'post not found' });
        }
        else{
        await Post.destroy({
        where: {
            id: postId
        }
        });
        return response.successDelete(res);
    }
    } catch (error) {
        response.failureResponse(res);
    }
};

// Update Post
export const updatePost = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;
        const { title, description } = req.body;
        const post = await Post.findByPk(postId);
        if (!post) {
            return response.recordNotFound(res);
        }
        post.title = title;
        post.description = description;        
        await post.save();
        return response.postUpdate(res);
    } catch (error) {
        return response.failureResponse(res);
    }
};

