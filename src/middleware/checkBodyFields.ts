import { Request, Response, NextFunction } from 'express';

export const checkRequiredBodyFields = (requiredFields: string[]) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const missingFields = requiredFields.filter(field => !(field in req.body));
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }
    next();
}



