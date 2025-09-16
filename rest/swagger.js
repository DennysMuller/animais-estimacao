const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PetStore API',
      version: '1.0.0',
      description: 'Uma API simples para gerenciar animais de estimação com autenticação JWT.',
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints para registro e login de usuários.',
      },
      {
        name: 'Pets',
        description: 'Gerenciamento de animais de estimação (requer autenticação).',
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
  apis: ['./rest/routes/*.js'], // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;