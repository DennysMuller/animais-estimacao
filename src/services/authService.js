const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');

const JWT_SECRET = 'your_super_secret_key'; // Mova para variáveis de ambiente em produção!

const register = async (email, password) => {
    const existingUser = userModel.findByEmail(email);
    if (existingUser) {
        throw new Error('Usuário já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: uuidv4(),
        email,
        password: hashedPassword,
    };

    userModel.create(newUser);
    // Retornamos o usuário sem a senha
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

const login = async (email, password) => {
    const user = userModel.findByEmail(email);
    if (!user) {
        throw new Error('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h', // Token expira em 1 hora
    });

    return { token };
};

module.exports = { register, login };