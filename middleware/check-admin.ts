import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
    user?: any; 
}

export const checkAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Only admin shows the user.' });
    }
    next(); 
};