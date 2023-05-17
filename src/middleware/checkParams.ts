import { Request, Response, NextFunction } from 'express';

export const checkParamsExistence = (paramNames: string[]) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const missingParams = paramNames.filter((param) => !(param in req.params));
    if (missingParams.length > 0) {
        const errorMessage = `Missing required parameters: ${missingParams.join(', ')}`;
        return res.status(400).json({ error: errorMessage });
    }
    next();
};
