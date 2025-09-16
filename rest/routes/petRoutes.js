const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { verifyToken } = require('../../middleware/authMiddleware');

// Todas as rotas de pets são protegidas e exigem um token JWT válido
router.use(verifyToken);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Cadastra um novo pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTag: { type: string, description: "Placa de identificação única", example: "XYZ-123" }
 *               name: { type: string, example: "Rex" }
 *               species: { type: string, enum: ["cão", "gato", "peixe", "pássaro", "roedor", "réptil", "exótico"], example: "cão" }
 *               birthDate: { type: string, format: date, example: "2020-01-15" }
 *               vaccines: { type: array, items: { type: string }, example: ["Raiva", "V10"] }
 *     responses:
 *       201: { description: "Pet criado com sucesso" }
 *       400: { description: "Dados inválidos" }
 *       401: { description: "Não autorizado" }
 *       409: { description: "Placa de identificação já existe" }
 */
router.post('/', petController.create);

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Lista todos os pets do usuário autenticado
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: "Lista de pets" }
 *       401: { description: "Não autorizado" }
 */
router.get('/', petController.getAll);

/**
 * @swagger
 * /pets/{idTag}:
 *   get:
 *     summary: Busca um pet pela placa de identificação
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTag
 *         schema: { type: string }
 *         required: true
 *         description: Placa de identificação do pet
 *     responses:
 *       200: { description: "Dados do pet" }
 *       401: { description: "Não autorizado" }
 *       403: { description: "Acesso proibido (pet de outro dono)" }
 *       404: { description: "Pet não encontrado" }
 */
router.get('/:idTag', petController.getById);

/**
 * @swagger
 * /pets/{idTag}:
 *   put:
 *     summary: Atualiza os dados de um pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTag
 *         schema: { type: string }
 *         required: true
 *         description: Placa de identificação do pet
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               birthDate: { type: string, format: date }
 *     responses:
 *       200: { description: "Pet atualizado com sucesso" }
 *       404: { description: "Pet não encontrado" }
 */
router.put('/:idTag', petController.update);

/**
 * @swagger
 * /pets/{idTag}:
 *   delete:
 *     summary: Remove um pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTag
 *         schema: { type: string }
 *         required: true
 *         description: Placa de identificação do pet a ser removido
 *     responses:
 *       204: { description: "Pet removido com sucesso" }
 *       403: { description: "Acesso não autorizado" }
 *       404: { description: "Pet não encontrado" }
 */
router.delete('/:idTag', petController.remove);

module.exports = router;