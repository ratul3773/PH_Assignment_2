import { Request, Response } from 'express';
import { DeleteUser, getAllUsers, updateUser } from './user.service';
import {} from '../types/index';

const getAll_Users = async (req : Request, res: Response) => {
  try{
    const userInfo = req.user!;
    if(userInfo.role !== 'admin'){
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admins only',
      });
     }
    const result = await getAllUsers();
    if(result.rows.length === 0){
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result.rows,
    });
  }catch(err :any){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const update_User = async (req: Request, res: Response) => {
  try{
    const userInfo = req.user!;
    if(userInfo.role !== 'admin' && userInfo.id !== parseInt(req.params.id!)){
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admins only',
      });
     }
     const result = await updateUser(req.body, parseInt(req.params.id!), userInfo.role);
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0],
      });
}
  catch(err: any){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const Delete_User = async (req: Request, res: Response) => {
  try{
    const userInfo = req.user!;
    if(userInfo.role !== 'admin'){
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admins only',
      });
     }
     const result = await DeleteUser(parseInt(req.params.id!));
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: result.rows[0],
      });
}
  catch(err: any){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export { getAll_Users, update_User, Delete_User };