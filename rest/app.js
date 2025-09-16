const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Rotas da API
app.use('/auth', authRoutes);
app.use('/pets', petRoutes); // Prefixo /pets para as rotas de animais

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;