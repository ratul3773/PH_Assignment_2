import { Pool } from "pg";
import { User } from "../user/user.models";
import { Vehicle } from "../vehicle/vehicle.models";
import { Bookings } from "../booking/booking.models";
import config from "../config";

const pool = new Pool({
    connectionString : config.CONNECTION_STRING,
})

const initDB = async () => {
    await pool.query(User)
    await pool.query(Vehicle)
    await pool.query(Bookings)
}

export {initDB, pool};