import { authService, createUser } from "./auth.service";
import { Request, Response } from "express";

const signinUser = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    try {
        const result = await authService.signinUser(email, password);
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: result
        });
    }
    catch (err : any) {
        res.status(401).json({
            success: false,
            message: "Signin failed",
            error: err.message,
        });
    }
}

const signupUser = async (req : Request, res: Response) => {
  try{
    const result = await createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result
    });
  }catch(err : any){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const AuthController = {
    signinUser,
    signupUser
};