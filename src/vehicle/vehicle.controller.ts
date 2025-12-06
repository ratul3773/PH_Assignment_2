import { Request, Response } from 'express';
import { Vehicle } from './vehicle.service';



const getAll_Vehicles = async (req : Request, res: Response) => {
  try{
    const result = await Vehicle.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result.rows,
    });
  }catch(err :any){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getVehicleby_Id = async (req : Request, res: Response) => {
    try{
    const result = await Vehicle.getVehiclebyId(parseInt(req.params.id!));
    if(result.rows.length === 0){
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result.rows,
    });
  }catch(err :any){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const create_Vehicle = async (req: Request, res: Response) => {
    try{
    const userInfo = req.user!;
    if(userInfo.role !== 'admin'){
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only admins can create vehicles',
      });
     }
     const result = await Vehicle.createVehicle(req.body);
      return res.status(201).json({
        success: true,
        message: 'Vehicle created successfully',
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

const update_Vehicle = async (req: Request, res: Response) => {
  try{
    const userInfo = req.user!;
    if(userInfo.role !== 'admin'){
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only admins can update vehicles',
      });
     }
     const result = await Vehicle.updateVehicle(req.body, parseInt(req.params.id!));
      return res.status(200).json({
        success: true,
        message: 'Vehicle updated successfully',
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

const Delete_Vehicle = async (req: Request, res: Response) => {
  try{
    const userInfo = req.user!;
    if(userInfo.role !== 'admin'){
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only admins can delete vehicles',
      });
     }
     const result = await Vehicle.DeleteVehicle(parseInt(req.params.id!));
      return res.status(200).json({
        success: true,
        message: 'Vehicle deleted successfully',
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

export const VehicleController  = { getAll_Vehicles, getVehicleby_Id, create_Vehicle, update_Vehicle, Delete_Vehicle };