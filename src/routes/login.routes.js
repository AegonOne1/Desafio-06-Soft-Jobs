import express from "express";
import { createNewUser, loginUser, getAuthenticatedUser} from "../controllers/login.controllers.js";
import { authenMiddleware } from "../middleware/authenMiddleware.js";


const router = express.Router();


router.post("/usuarios", createNewUser);
router.post("/login", loginUser);
router.get("/usuarios", authenMiddleware, getAuthenticatedUser);

export default router;