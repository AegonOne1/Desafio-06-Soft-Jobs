import express from "express";
import { createNewUser, loginUser, getAuthenticatedUser} from "../controllers/login.controllers.js";
import { authenMiddleware } from "../middleware/authenMiddleware.js";


const router = express.Router();

// RUTA PARA CREAR USUARIO
router.post("/usuarios", createNewUser);

// RUTA PARA INICIAR SESION 
router.post("/login", loginUser);

// RUTA PARA OBTENER AUTHENTIFICACION
router.get("/usuarios", authenMiddleware, getAuthenticatedUser);

export default router;