const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_super_secret_key'; // Use a mesma chave secreta do service

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Adiciona os dados do usuário decodificados ao objeto da requisição
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado.' });
        }
        return res.status(403).json({ message: 'Token inválido.' });
    }
};

module.exports = { verifyToken };