import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./src/middleware/errorHandler";
import 'dotenv/config';



const app = express();
const PORT = porcess.env.PORT || 3000;

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//ROUTER
app.use('/', routesLogin);

// MANEJO DE ERRORES
app.use(errorHandler);


//SERVER ON
app.listen(PORT, () =>{
    console.log(`SERVER ON http://localhost:${PORT}`)
});