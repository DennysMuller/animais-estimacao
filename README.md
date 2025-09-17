# PetStore API

Uma API RESTful simples, construída com Node.js e Express, para gerenciar animais de estimação. A API utiliza autenticação baseada em JSON Web Tokens (JWT) e armazena os dados em arquivos JSON locais, seguindo uma arquitetura de software bem definida com separação de responsabilidades (Controllers, Services, Models).

## ✨ Funcionalidades

-   **Autenticação de Usuários**: Sistema completo de registro e login com JWT.
-   **Segurança**: Senhas armazenadas com hash (usando `bcryptjs`).
-   **Gerenciamento de Pets (CRUD)**:
    -   Cadastrar novos pets.
    -   Listar todos os pets de um usuário autenticado.
    -   Buscar um pet específico por sua placa de identificação.
    -   Atualizar informações de um pet.
    -   Remover um pet.
-   **Regras de Negócio**: Um usuário só pode visualizar e gerenciar seus próprios pets.
-   **Documentação Interativa**: Documentação completa e testável com Swagger (OpenAPI).
-   **Testes Automatizados**: Testes de unidade e de ponta a ponta (E2E) utilizando Mocha, Chai, Sinon e SuperTest.

## 📂 Estrutura do Projeto

```
.
├── .gitignore
├── package.json
├── data/
│   ├── pets.json
│   └── users.json
├── middleware/
│   └── authMiddleware.js
├── rest/
│   ├── app.js
│   ├── server.js
│   ├── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── petController.js
│   └── routes/
│       ├── authRoutes.js
│       └── petRoutes.js
├── src/
│   ├── models/
│   │   ├── petModel.js
│   │   └── userModel.js
│   └── services/
│       ├── authService.js
│       └── petService.js
└── test/
    ├── controller.test.js
    └── e2e.test.js
```

## 🚀 Pré-requisitos

-   Node.js (versão 14 ou superior)
-   npm (geralmente instalado com o Node.js)

## ⚙️ Instalação

1.  Clone o repositório para sua máquina local:
    ```bash
    git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
    cd NOME_DO_REPOSITORIO
    ```

2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

## 🏃‍♀️ Executando a Aplicação

### Modo de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com reinicialização automática (usando `nodemon`):

```bash
npm run dev
```

### Modo de Produção

Para iniciar o servidor em modo de produção:

```bash
npm start
```

Após iniciar, a API estará disponível em `http://localhost:3000`.

## 📚 Uso da API e Documentação

A documentação completa e interativa da API está disponível através do Swagger UI. Acesse o seguinte endereço no seu navegador:

**http://localhost:3000/api-docs**

### Fluxo de Autenticação

Para acessar os endpoints protegidos (todos os de `/pets`), você precisa primeiro se autenticar:

1.  **Registre um usuário**: Use o endpoint `POST /auth/register` para criar uma conta, fornecendo um `email` e `password`.
2.  **Faça login**: Use o endpoint `POST /auth/login` com as mesmas credenciais para receber um token JWT.
3.  **Autorize suas requisições**:
    -   Na página do Swagger, clique no botão **"Authorize"** no canto superior direito.
    -   Cole o token recebido no campo "Value" e clique em "Authorize".
    -   Agora você pode testar todos os endpoints protegidos diretamente pela documentação.

## 🧪 Executando os Testes

Para rodar a suíte de testes automatizados (unidade e E2E), execute o comando:

```bash
npm test
```

## 🛠️ Tecnologias Utilizadas

-   **Backend**: Node.js, Express.js
-   **Autenticação**: JSON Web Token (JWT), bcryptjs
-   **Testes**: Mocha, Chai, SuperTest, Sinon
-   **Documentação**: Swagger (swagger-jsdoc, swagger-ui-express)
-   **Utilitários**: Nodemon
