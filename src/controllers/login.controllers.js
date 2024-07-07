import { findUserByEmail, createUser } from "../models/login.models.js";

const createNewUser = async (req,res) =>{
    const {email, password, rol, lenguage} = req.body;
    try {
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
};

const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await findUserByEmail(email);
        if (!user){
            return res.status(400).json({ error: "Usuario invalido"});
        }

        const loginOn = bcrypt.compareSync(password, user.password);
        if(!loginOn){
            return res.status(400).json({ error: "Contraseña incorrecta"});
        }

        const token = jwt.sign({email: user.email }, "secret_pass", {expiresIn: "1h"});
        res.json({token});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const getAuthenticatedUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export {createNewUser, loginUser,  getAuthenticatedUser}