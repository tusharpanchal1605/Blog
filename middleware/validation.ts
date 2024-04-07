import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { BODY } from '../util/constant';
import { Message } from '../util/constructor';

export const userCreateValidation = [
    (req: Request, res: Response, next: NextFunction) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json(new Message(BODY, false));
        }
        next();
    },

    (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            first_name: Joi.string().pattern(/^[a-zA-Z]+$/).message('first name must contain only alphabets and be one word').required(),
            last_name: Joi.string().pattern(/^[a-zA-Z]+$/).message('Last name must contain only alphabets and be one word').required(),
            email: Joi.string().email().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[\.[a-zA-Z0-9-]+]*$/).message('Invalid email format ,"Format:example@email.com"').required(),
            password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                .message('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required(),
            isAdmin:Joi.boolean()
        });

        const { error } = schema.validate(req.body);
        console.log("error:",error);
        if (error) {
            return res.status(400).json({ message: 'Validation failed', errors: [{ msg: error.message }], status: false });
        }
        next();
    }
];

export const userLoginValidation = [
    (req: Request, res: Response, next: NextFunction) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json(new Message(BODY, false));
        }
        next();
    },

    (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            email: Joi.string().email().message('Invalid email format').required(),
            password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                .message('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation failed', errors: [{ msg: error.message }], status: false });
        }
        next();
    }
];

export const createPostValidation = [
    (req: Request, res: Response, next: NextFunction) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json(new Message(BODY, false));
        }
        next();
    },

    (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            title: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).message('Title must contain only alphanumeric').required(),
            description: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).message('Description must contain only alphanumeric').required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation failed', errors: [{ msg: error.message }], status: false });
        }
        next();
    }
];
