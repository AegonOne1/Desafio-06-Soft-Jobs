import { findUserByEmail, createUser } from "../models/login.models";

const createNewUser = async (req,res) =>{
    try {
        const {user} = req.body;
        const {email, password, rol, lenguage} = user;

        // VERIFICADOR DE USUARIO EXISTENTE
        const createdUser = await findUserByEmail(email);
        if (createdUser){
            return res.status(400).json({ error: "Email ya registrado, reintete con otro"})
        }

        // VERIFICADOR DE DATOS DEL USUARIO
        if (!email || !password || !rol || !lenguage){
            return res.status(400).json({error: "Todos los campos requeridos"})
        };

        const newUser = await createUser(user);
        res.status(201).json({ user: newUser});
        
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export {createNewUser}