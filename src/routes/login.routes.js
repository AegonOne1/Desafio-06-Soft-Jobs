import express from "express";
import { createNewUser, loginUser } from "../controllers/login.controllers";


const router = express.Router();

router.post("/", createNewUser);
router.post("/login", loginUser);




export default router;