import pool from "../../database/config.js";
import bcrypt from "bcryptjs"

const findUserByEmail = async (email) =>{
    const queryReq = {
        text: "SELECT * FROM usuarios WHERE email = $1",
        values: [email],
    };
    const res = await pool.query(queryReq);
    return res.rows[0];
};

const createUser = async ({email, password, rol, lenguage}) =>{
    const hashedPassword = bcrypt.hashSync(password)
    const queryReq = {
        text: "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *",
        values: [email, rol, lenguage, hashedPassword],
    };
    const res = await pool.query(queryReq);
    return res.rows[0];
};

export {findUserByEmail, createUser};