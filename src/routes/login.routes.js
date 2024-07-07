import express from "express";
import { createNewUser, loginUser } from "../controllers/login.controllers";
import { authenMiddleware } from "../middleware/authenMiddleware";


const router = express.Router();

router.post("/", createNewUser);
router.post("/login", loginUser);
router.get("/", authenMiddleware, (req, res) =>{
    res.send("Ruta protegida");
})



export default router;