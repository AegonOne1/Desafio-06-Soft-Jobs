import express from "express";
import { createNewUser, loginUser } from "../controllers/login.controllers.js";
import { authenMiddleware } from "../middleware/authenMiddleware.js";


const router = express.Router();

router.post("/", createNewUser);
router.post("/login", loginUser);
router.get("/", authenMiddleware, (req, res) =>{
    res.send("Ruta protegida");
})



export default router;