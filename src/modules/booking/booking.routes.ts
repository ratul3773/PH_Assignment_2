import { Router } from "express";
import { auth } from "../../middlware/auth.middleware";
import { BookingController } from "./booking.controller";

const router = Router();
router.get('/',auth(),BookingController.getAll_Bookings);

router.post('/',auth(),BookingController.create_Booking);
router.put('/:id',auth(),BookingController.update_Booking);

export const BookingRouter = router;

