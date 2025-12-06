import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getAllUsers } from "../user/user.service";

const auth = () => {
  return async (req: Request, res: Response, next: Function) => {
    try{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
      return res.status(401).json({
        success: false,
        message: 'You are not authorized',
      });
    }
    const userInfo = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = userInfo.user;
    next();
  }catch(err :any){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  }
}

export { auth };