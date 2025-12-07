import { pool } from '../config/DB';

const createVehicle = async (payload : Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const isExisting = await pool.query(`SELECT * FROM vehicles WHERE registration_number = $1`, [registration_number]);
    if(isExisting.rows.length > 0){
        throw new Error('Vehicle already exists with this registration number');
    }
    const result = await pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
    [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
}

const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

const getVehiclebyId = async (vehicleId: number) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    return result;
}

const updateVehicle = async (payload : Record<string, unknown>, vehicleId: number) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
        const result = await pool.query(
        `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]
    );
    return result;
}

const DeleteVehicle = async (vehicleId: number) => {

    const isExisting = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    if(isExisting.rows.length === 0){
        throw new Error('Vehicle does not exist');
    }
    const havebookings = await pool.query(`SELECT * FROM bookings WHERE vehicle_id = $1`, [vehicleId]);
    if(havebookings.rows.length > 0){
        throw new Error('Cannot delete vehicle with existing bookings');
    }
    
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [vehicleId]);
    return result;
}

export const Vehicle = { getAllVehicles, getVehiclebyId, createVehicle ,updateVehicle, DeleteVehicle };