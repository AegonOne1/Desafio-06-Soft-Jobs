import { findUserByEmail, createUser } from "../models/login.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createNewUser = async (req, res) => {
    const { email, password, rol, lenguage } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email ya registrado, inténtelo con otro" });
        }

        // Verificar que todos los campos requeridos estén presentes
        if (!email || !password || !rol || !lenguage) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        // Crear nuevo usuario
        const newUser = await createUser({ email, password, rol, lenguage });
        res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "Usuario inválido" });
        }

        // Comparar contraseñas
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAuthenticatedUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export { createNewUser, loginUser, getAuthenticatedUser };
