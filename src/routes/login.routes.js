import express from "express";
import { createNewUser, loginUser, getAuthenticatedUser} from "../controllers/login.controllers.js";
import { authenMiddleware } from "../middleware/authenMiddleware.js";


const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/usuarios", createNewUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta para obtener información de usuarios autenticados, con autenticación requerida
router.get("/usuarios", authenMiddleware, getAuthenticatedUser);

export default router;