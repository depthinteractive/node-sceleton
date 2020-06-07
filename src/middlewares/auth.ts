import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface IDecodeToken {
  userId: string,
  email: string,
  iat: number,
  exp: number
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  
  if (!authHeader) {
    (req as any).isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  const decodedToken: IDecodeToken = (jwt.verify(token, 'nodeappsupersecretkey') as IDecodeToken);

  if (!decodedToken) {
    (req as any).isAuth = false;
    return next();
  }
  (req as any).userId = decodedToken.userId;
  (req as any).isAuth = true;
  next();
};
export default auth;