import { pool } from '../config/DB';

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

const updateUser = async (payload : Record<string, unknown>, userId: number, role: string) => {
    const { name, email,phone,password,role : newRole } = payload;
    if(role === 'admin'){
        const result = await pool.query(
        `UPDATE users SET name = $1, email = $2, phone = $3, password = $4, role = $5 WHERE id = $6 RETURNING *`,
        [name, email, phone,password ,newRole, userId]
    );
    return result;
    }
    else{
        const result = await pool.query(
        `UPDATE users SET name = $1, email = $2, phone = $3, password = $4 WHERE id = $5 RETURNING *`,
        [name, email, phone,password ,userId]
    );
    return result;
    }
}

const DeleteUser = async (userId: number) => {
    const havebookings = await pool.query(`SELECT * FROM bookings WHERE user_id = $1`, [userId]);
    if(havebookings.rows.length > 0){
        throw new Error('Cannot delete user with existing bookings');
    }
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);
    return result;
}

export { getAllUsers, updateUser, DeleteUser };