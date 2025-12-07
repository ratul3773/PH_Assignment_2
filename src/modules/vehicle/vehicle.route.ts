import { Router } from "express";
import { auth } from "../../middlware/auth.middleware";
import { VehicleController } from "./vehicle.controller";

const router = Router();

router.post('/',auth(),VehicleController.create_Vehicle);
router.get('/',auth(),VehicleController.getAll_Vehicles);
router.get('/:id',auth(),VehicleController.getVehicleby_Id);
router.put('/:id',auth(), VehicleController.update_Vehicle);
router.delete('/:id',auth(), VehicleController.Delete_Vehicle);

export const VehicleRouter = router;