import jwt from "jsonwebtoken"

const authenMiddleware = (req, res, next) =>{
    const token  = req.header("Authorizacion");

    if (!token){
        return res.status(401).json({ error: "No se proporciona ningun token"});
    }

    try {
        const decodificado = jwt.verify(token, "secret_pass");
        req.user = decodificado
        next();
    } catch (error) {
        res.status(401).json({ error: "Token invalido"});
    }
}

export {authenMiddleware}