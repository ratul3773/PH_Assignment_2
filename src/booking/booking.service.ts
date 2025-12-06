import { pool } from '../config/DB';

const createBooking = async (payload: Record<string, unknown>) => {
    const { vehicle_id, customer_id, rent_start_date, rent_end_date } = payload;
    const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicle_id]);
    if (vehicle.rows.length === 0) {
        throw new Error('Vehicle does not exist');
    }
    if (vehicle.rows[0].availability_status === 'booked') {
        throw new Error('Vehicle is already booked');
    }
    if (new Date(rent_start_date as string) > new Date(rent_end_date as string) || new Date(rent_start_date as string).getTime() < Date.now()) {
        throw new Error('Invalid booking dates');
    }
    const price_per_day = vehicle.rows[0].daily_rent_price;
    const startDate = new Date(rent_start_date as string);
    const endDate = new Date(rent_end_date as string);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const total_price = days * price_per_day;
    const result = await pool.query(`INSERT INTO bookings (vehicle_id, customer_id, rent_start_date, rent_end_date, total_price,status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [vehicle_id, customer_id, rent_start_date, rent_end_date, total_price, 'active']);
    await pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicle_id]);
    const fullDetails = await pool.query(`SELECT * FROM bookings JOIN vehicles ON bookings.vehicle_id = vehicles.id  WHERE bookings.id = $1`, [result.rows[0].id]);
    const res = fullDetails.rows[0];
    return {
        id: result.rows[0].id,
        customer_id: res.customer_id,
        vehicle_id: res.vehicle_id,
        rent_start_date: res.rent_start_date,
        rent_end_date: res.rent_end_date,
        total_price: res.total_price,
        status: res.status,
        vehicle: {
            vehicle_name: res.vehicle_name,
            daily_rent_price: res.daily_rent_price
        }
    };
}

const getAllbookings = async (role: string, userId: number) => {
    if (role === 'admin') {
        //const result = await pool.query(`SELECT * FROM bookings JOIN vehicles ON bookings.vehicle_id = vehicles.id JOIN users ON bookings.customer_id = users.id`);
        const result = await pool.query(
            `SELECT 
        b.id AS booking_id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        u.name,
        u.email,
        v.vehicle_name,
        v.registration_number
     FROM bookings b
     JOIN vehicles v ON b.vehicle_id = v.id
     JOIN users u ON b.customer_id = u.id`
        );
        return result.rows.map(res => ({
            id: res.booking_id,
            customer_id: res.customer_id,
            vehicle_id: res.vehicle_id,
            rent_start_date: res.rent_start_date,
            rent_end_date: res.rent_end_date,
            total_price: res.total_price,
            status: res.status,
            customer: {
                name: res.name,
                email: res.email,
            },
            vehicle: {
                vehicle_name: res.vehicle_name,
                registration_number: res.registration_number,
            },
        }));
    }
    //const result = await pool.query(`SELECT * FROM bookings JOIN vehicles ON bookings.vehicle_id = vehicles.id WHERE customer_id = $1`, [userId]);
    const result = await pool.query(
        `SELECT 
      b.id AS booking_id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      v.vehicle_name,
      v.registration_number,
      v.type
   FROM bookings b
   JOIN vehicles v ON b.vehicle_id = v.id
   WHERE b.customer_id = $1`,
        [userId]
    );
    const res = result.rows[0];
    return {
        id: res.booking_id,
        customer_id: res.customer_id,
        vehicle_id: res.vehicle_id,
        rent_start_date: res.rent_start_date,
        rent_end_date: res.rent_end_date,
        total_price: res.total_price,
        status: res.status,
        vehicle: {
            vehicle_name: res.vehicle_name,
            registration_number: res.registration_number,
            type: res.type,
        },
    };
}

const updateBooking = async (payload:Record<string, unknown>, userRole: string, userId: number, bookingId: number,) => {
    const{ status } = payload;
    const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
    if (bookingRes.rows.length === 0) {
        throw new Error('Booking does not exist');
    }
    const booking = bookingRes.rows[0];
    if (userRole !== 'admin' && booking.customer_id !== userId) {
        throw new Error('Forbidden: You can only update your own bookings');
    }
    if(userRole !== 'admin' && status && status !== 'cancelled') {
        throw new Error('Forbidden: You can only cancel bookings');
    }
    if(new Date() >= booking.rent_start_date){
        throw new Error('Cannot cancel a booking that has already started');
    }
    const updatedBookingRes = await pool.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`, [status, bookingId]);
    if (status === 'cancelled' || status === 'returned') {
        await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1`, [booking.vehicle_id]);
    }
    return updatedBookingRes.rows[0];
}

const autoUpdateBookings = async () => {
    const updated = await pool.query(
        `UPDATE bookings SET status = 'returned' WHERE status = 'active' AND rent_end_date < NOW() RETURNING vehicle_id`
    );
    if (updated.rowCount === 0){
        return 0;
    };
    const vehicleIds = updated.rows.map(r => r.vehicle_id);
    await pool.query(
        `UPDATE vehicles SET availability_status = 'available' WHERE id = ANY($1::int[])`,
        [vehicleIds]
    );
    return updated.rowCount;
};

export const Booking = {
    createBooking,
    getAllbookings,
    updateBooking,
    autoUpdateBookings,
};