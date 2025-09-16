const authService = require('../../src/services/authService');

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const user = await authService.register(email, password);
        res.status(201).json(user);
    } catch (error) {
        // Se o erro for de usuário duplicado
        if (error.message.includes('cadastrado')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const token = await authService.login(email, password);
        res.status(200).json(token);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { register, login };