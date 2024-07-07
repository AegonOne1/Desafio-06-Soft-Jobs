import jwt from 'jsonwebtoken';

const authenMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'No se proporciona ningún token' });
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'default_secret';
        console.log('Token recibido:', token);

        // Asegúrate de que el token tenga el formato 'Bearer token'
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            throw new Error('Formato de token inválido');
        }

        const decoded = jwt.verify(tokenParts[1], secretKey);
        console.log('Token decodificado:', decoded);

        req.user = decoded; // Almacena la información decodificada del usuario en req.user
        next(); // Llama al siguiente middleware o ruta si la verificación es exitosa
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export { authenMiddleware };
