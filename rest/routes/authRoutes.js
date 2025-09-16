const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "dono@example.com" }
 *               password: { type: string, example: "senha123" }
 *     responses:
 *       201: { description: "Usuário criado com sucesso" }
 *       409: { description: "Usuário já existe" }
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "dono@example.com" }
 *               password: { type: string, example: "senha123" }
 *     responses:
 *       200: { description: "Login bem-sucedido, retorna token" }
 *       401: { description: "Credenciais inválidas" }
 */
router.post('/login', authController.login);

module.exports = router;