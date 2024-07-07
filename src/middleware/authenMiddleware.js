import jwt from "jsonwebtoken";

const authenMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "No se proporciona ningún token" });
    }

    try {
        const secretKey = process.env.JWT_SECRET || "default_secret";
        console.log("Token recibido:", token);

        const decoded = jwt.verify(token, secretKey);
        console.log("Token decodificado:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        res.status(401).json({ error: "Token inválido" });
    }
};


export { authenMiddleware };
