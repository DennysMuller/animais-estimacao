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
````markdown
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

## **Performance Test (k6)**

- **Propósito**: Testar o desempenho dos endpoints de autenticação e criação de pets usando um script k6 localizado em `test/k6/api-auth-performance-test.js`.
- **O que o script faz**: registra um usuário, realiza login para obter um token JWT e, em seguida, cria um pet usando esse token. Gera dados dinâmicos (nome do pet, espécie, idTag e data de nascimento) para cada execução.

**Arquivo principal do teste**: `test/k6/api-auth-performance-test.js`

**Observação importante sobre dados dinâmicos**: o script utiliza `xk6-faker` para gerar nomes e espécies de animais. Para que o import `k6/x/faker` funcione é necessário usar um binário do `k6` compilado com a extensão `xk6-faker`.

## **xk6-faker (extensão necessária)**

- **Requisitos**: `Go` instalado e `xk6` disponível no seu ambiente de desenvolvimento.
- **Como compilar um k6 com a extensão `xk6-faker` (exemplo)**:

```powershell
# Instale xk6 (apenas se ainda não tiver)
go install github.com/grafana/xk6/cmd/xk6@latest

# Compile o k6 com a extensão xk6-faker e gere um executável (Windows)
xk6 build --with github.com/grafana/xk6-faker@latest -o k6.exe
```

- Depois de gerar o `k6.exe`, use esse executável para rodar os scripts que importam `k6/x/faker`.

## **Web Dashboard (k6) — Windows PowerShell**

- **O que é**: o Web Dashboard fornece uma interface visual em tempo real para observar métricas do teste enquanto o k6 está rodando. É possível também exportar os dados para um arquivo HTML.
- **Variáveis de ambiente úteis (PowerShell)**:

```powershell
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-dashboard.html"
$env:K6_WEB_DASHBOARD_PERIOD = "2s"
```

- **Exemplo de execução (PowerShell)** — assume que você tem `k6.exe` (compilado com as extensões necessárias ou o k6 oficial conforme seu uso):

```powershell
# $env:K6_WEB_DASHBOARD = "true"; $env:K6_WEB_DASHBOARD_EXPORT = "html-dashboard.html"; $env:K6_WEB_DASHBOARD_PERIOD = "2s"; k6.exe run .\test\k6\api-auth-performance-test.js
```

- **Observações**:
  - Se estiver usando o `k6` instalado via pacote padrão (sem `xk6`), o dashboard pode não suportar algumas extensões; ainda assim as métricas básicas estarão disponíveis.
  - A opção `K6_WEB_DASHBOARD_EXPORT` cria um arquivo HTML com o dashboard ao final do teste (útil para compartilhamento).
  - `K6_WEB_DASHBOARD_PERIOD` controla a frequência (ex.: `2s`) com que o dashboard atualiza os dados.

## **Dicas rápidas**

- **Execução local rápida** (sem xk6-faker): se você não precisa das funções do faker, com o `k6` padrão instale e rode o script normalmente:

```powershell
# Com k6 instalado no PATH
k6 run .\test\k6\api-auth-performance-test.js
```

- **Semente (seed) para resultados determinísticos**: se quiser resultados repetíveis, instancie o faker com seed em `api-auth-performance-test.js`: `const faker = new Faker(1234)`.
