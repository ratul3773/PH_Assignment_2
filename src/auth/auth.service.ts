import { pool } from "../config/DB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signinUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if(result.rows.length === 0){
        throw new Error('User not found');
    }
    const user = result.rows[0];
    const verify = await bcrypt.compare(password, user.password);
    if(!verify){
        throw new Error('Invalid password');
    }
    const token = jwt.sign({user}, process.env.JWT_SECRET as string, {expiresIn: '5d'});
    return { token ,user};
}


const createUser = async (payload:Record<string, unknown>) => {
    //logic to create customer
    const {name, email, password, phone, role} = payload;
    const hashedPassword = await bcrypt.hash(password as string,10);
    const isExisting = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if(isExisting.rows.length > 0){
        throw new Error('User already exists with this email');
    }
    if((phone as string).length != 11){
        throw new Error('Phone number must be 11 digits');
    }
    if((password as string).length < 6){
        throw new Error('Password must be at least 6 characters long');
    }
    if(!['customer', 'admin'].includes(role as string)){
        throw new Error('Role must be either customer or admin');
    }
    const result = await pool.query(`INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
    [name, email, hashedPassword, phone, role]);
    return result.rows[0];
}
export {createUser};

export const authService = {
    signinUser,
    createUser
};