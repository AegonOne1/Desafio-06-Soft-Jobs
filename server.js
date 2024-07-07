import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./src/routes/login.routes.js";
import 'dotenv/config';



const app = express();
const PORT = process.env.PORT || 3000;


// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//ROUTER
app.use('/usuarios', router);


//SERVER ON
app.listen(PORT, () =>{
    console.log(`SERVER ON http://localhost:${PORT}`)
});