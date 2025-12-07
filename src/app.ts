import express from 'express'
import { initDB } from './config/DB'
import { AuthRouter } from './auth/auth.route'
import { UserRouter } from './modules/user/user.routes'
import { VehicleRouter } from './modules/vehicle/vehicle.route'
import { BookingRouter } from './modules/booking/booking.routes'

const app = express()

const prefix = '/api/v1';
initDB()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(`${prefix}/auth`, AuthRouter);
app.use(`${prefix}/users`, UserRouter);
app.use(`${prefix}/vehicles`, VehicleRouter);
app.use(`${prefix}/bookings`, BookingRouter);

export default app;