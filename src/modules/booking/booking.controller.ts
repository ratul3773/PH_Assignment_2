import e, { Request, Response } from 'express';
import { Booking } from './booking.service';
import { } from '../../types/index'

const getAll_Bookings = async (req: Request, res: Response) => {
  try {
    const userRole = req.user!.role as string;
    const userId = req.user!.id as number;
    const result = await Booking.getAllbookings(userRole, userId);
    res.status(200).json({
      success: true,
      message: userRole === "admin" ? "All bookings fetched successfully" : "Your bookings fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const create_Booking = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id as number;
    if (req.body.customer_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only create bookings for yourself',
      });
    }
    const result = await Booking.createBooking(req.body);
    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: result,
    });
  }
  catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const update_Booking = async (req: Request, res: Response) => {
  try {
    const userRole = req.user!.role as string;
    const userId = req.user!.id as number;
    const bookingId = parseInt(req.params.id!);
    const result = await Booking.updateBooking(req.body, userRole, userId, bookingId);
    return res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data : result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const BookingController = { getAll_Bookings, create_Booking, update_Booking };