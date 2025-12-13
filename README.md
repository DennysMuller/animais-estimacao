# PetStore API

Uma API RESTful simples, construída com Node.js e Express, para gerenciar animais de estimação. A API utiliza autenticação baseada em JSON Web Tokens (JWT) e armazena os dados em arquivos JSON locais, seguindo uma arquitetura de software bem definida com separação de responsabilidades (Controllers, Services, Models).

## Funcionalidades

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

## Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:
```
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
    ├── controller/
    │   └── controller.test.js
    ├── external/
    │   └── external.test.js
    ├── fixture/
    │   ├── requisicoes/
    │   └── respostas/
    ├── k6/
    │   ├── data/
    │   │   └── login.test.data.json
    │   ├── helpers/
    │   │   ├── baseUrlHelper.js
    │   │   ├── loginHelper.js
    │   │   └──  randomHelpers.js
    │   ├── api-auth-performance-handleSummary-test.js
    │   ├── api-auth-performance-test.js
    │   ├── login.test.js
    │   └── trabalho-final-da-disciplina.test.js
    └── e2e.test.js
```

## Pré-requisitos

-   Node.js (versão 14 ou superior)
-   npm (geralmente instalado com o Node.js)

## Instalação

1.  Clone o repositório para sua máquina local:
    ```bash
    git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
    cd NOME_DO_REPOSITORIO
    ```

2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

## Executando a Aplicação

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

## Uso da API e Documentação

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

## Executando os Testes

Para rodar a suíte de testes automatizados (unidade e E2E), execute o comando:

```bash
npm test
```

## Tecnologias Utilizadas

-   **Backend**: Node.js, Express.js
-   **Autenticação**: JSON Web Token (JWT), bcryptjs
-   **Testes**: Mocha, Chai, SuperTest, Sinon
-   **Documentação**: Swagger (swagger-jsdoc, swagger-ui-express)
-   **Utilitários**: Nodemon

## Performance Test (k6)

- **Propósito**: Testar o desempenho dos endpoints de autenticação e criação de pets usando um script k6 localizado em `test/k6/api-auth-performance-test.js`.
- **O que o script faz**: registra um usuário, realiza login para obter um token JWT e, em seguida, cria um pet usando esse token. Gera dados dinâmicos (nome do pet, espécie, idTag e data de nascimento) para cada execução.

**Arquivo principal do teste**: `test/k6/api-auth-performance-test.js`

**Observação importante sobre dados dinâmicos**: o script utiliza `xk6-faker` para gerar nomes e espécies de animais. Para que o import `k6/x/faker` funcione é necessário usar um binário do `k6` compilado com a extensão `xk6-faker`.

## Web Dashboard (k6) — Windows PowerShell

- **O que é**: o Web Dashboard fornece uma interface visual em tempo real para observar métricas do teste enquanto o k6 está rodando. É possível também exportar os dados para um arquivo HTML.
- **Variáveis de ambiente úteis (PowerShell)**:

```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="nome_para_o_relatorio.html"; $env:K6_WEB_DASHBOARD_PERIOD="2s"; k6 run .\caminho\nome.do.arquivo.de.test.js --env BASE_URL=http://localhost:3000
```

- **Exemplo de execução (PowerShell)** — assume que você tem `k6.exe` (compilado com as extensões necessárias ou o k6 oficial conforme seu uso):

```powershell
# $env:K6_WEB_DASHBOARD = "true"; $env:K6_WEB_DASHBOARD_EXPORT = "html-dashboard.html"; $env:K6_WEB_DASHBOARD_PERIOD = "2s"; k6.exe run .\test\k6\api-auth-performance-test.js --env BASE_URL=http://localhost:3000
```

- **Observações**:
  - Se estiver usando o `k6` instalado via pacote padrão (sem `xk6`), o dashboard pode não suportar algumas extensões; ainda assim as métricas básicas estarão disponíveis.
  - A opção `K6_WEB_DASHBOARD_EXPORT` cria um arquivo HTML com o dashboard ao final do teste (útil para compartilhamento).
  - `K6_WEB_DASHBOARD_PERIOD` controla a frequência (ex.: `2s`) com que o dashboard atualiza os dados.

## Dicas rápidas

- **Execução local rápida** (sem xk6-faker): se você não precisa das funções do faker, com o `k6` padrão instale e rode o script normalmente:

```powershell
# Com k6 instalado no PATH
k6 run .\test\k6\api-auth-performance-test.js
```

- **Semente (seed) para resultados determinísticos**: se quiser resultados repetíveis, instancie o faker com seed em `api-auth-performance-test.js`: `const faker = new Faker(1234)`.
    
<br>

---
# Trabalho final da disciplina: **Automacao de Testes de Performance**

## Conceitos abordados
- Thresholds
- Checks
- Helpers
- Trends
- Faker
- Variável de Ambiente
- Stages
- Reaproveitamento de Resposta
- Uso de Token de Autenticação
- Data-Driven Testing
- Groups

### Os códigos dos testes de performance estão na pasta `test\k6\`e demonstram os conceitos acima.

Os arquivos de testes são:
1. **login.test.js**
2. **trabalho-final-da-disciplina.test.js**

### Sobre cada conceito abordado em seu respectivo arquivo de teste:
1. **Thresholds**: definem critérios de sucesso para o teste, como tempos máximos de resposta. Podemos visualizar no arquivo **dois**:
    ```javascript
    thresholds: {
        http_req_duration: ['p(95)<20000', 'p(90)<16000'], // 95% dos requests devem ser < 2, 90% dos requests devem ser < 1,6s
        pet_post_duration: ['p(95)<5000'], // 95% dos posts checkout devem ser < 5s
        'checks': ['rate==1'], // Todos os checks devem passar
    };
    ```
2. **Checks**: Permitem validar respostas específicas durante o teste, garantindo que os dados retornados estejam corretos, podemos visualizar no arquivo **dois**:
    ```javascript
    check(res, {
            'Login com sucesso status 200': (r) => r.status === 200,
            'Login tem token': (r) => r.json('token') !== undefined,
        });
    ```
3. **Helpers**: Funções auxiliares que permitem a reutilização de código melhorando a organização dos testes. Podemos visualizar no arquivo **dois**:
    ```javascript
    import { getBaseUrl } from './helpers/baseUrlHelper.js';
    import { login } from './helpers/loginHelper.js';

    // Uso dos helpers, funções getBaseUrl e login
    group('Registrar Usuário', function () {
        const url = `${getBaseUrl()}/auth/register`;
        const payload = JSON.stringify({ 
          email: email, 
          password: senha 
        });
    group('Login Usuário', function () {
        const res = login(email, senha);
        check(res, {
            'Login com sucesso status 200': (r) => r.status === 200,
            'Login tem token': (r) => r.json('token') !== undefined,
        });
    ```
4. **Trends**: Métricas que ajudam a monitorar o desempenho ao longo do tempo, como tempos médios de resposta. Vemos no arquivo **dois**:
    ```javascript
    import { Trend } from 'k6/metrics';

    const petPostTrend = new Trend('pet_post_duration', true);

    // Medindo o tempo de criação do pet
    const res = http.post(url, payload, params);
    petPostTrend.add(res.timings.duration);
    ```
5. **Faker**: Biblioteca utilizada para gerar dados de teste "realistas" e variados. Vemos no arquivo **dois**:
    ```javascript
    import { Faker } from 'k6/x/faker';

    let faker = new Faker();

    export function randomSpecies() {
        // Uso do faker para gerar tipos de animais
        const especies = [`${faker.animal.bird()}`, `${faker.animal.cat()}`, `${faker.animal.dog()}`, `${faker.animal.farmAnimal()}`, `${faker.animal.animal()}`, `${faker.zen.animal()}`];
        return especies[Math.floor(Math.random() * especies.length)];
    }
    
    export function randomBirthDate() {
        // Uso do faker para gerar datas de nascimento, padrão ISO
        const dataISO = faker.time.dateRange('2015-01-01', '2025-12-31');
        // Converte para o formato pt-BR
        const data = new Date(dataISO);
        const dataBR = data.toLocaleDateString('pt-BR');
        return dataBR;
    }
    ```
6. **Variável de Ambiente**: Permite configurar parâmetros do teste sem alterar o código, facilitando a execução em diferentes ambientes. Vemos no arquivo **um**:
    ```javascript
    // Uso da variável de ambiente BASE_URL
    // Necessário passar --env BASE_URL=http://localhost:3000 na execução do k6
    const url = `${__ENV.BASE_URL}/auth/login`;
    ```
7. **Stages**: Definem diferentes fases ou etapas do teste, como ramp-up, steady state e ramp-down. Simula diferentes cargas de usuários. Vemos no arquivo **um**:
    ```javascript
    stages: [
        { duration: '3s', target: 10 },     // Ramp up: em 3s vamos de 0 a 10 usuários
        { duration: '15s', target: 10 },    // Average: manter 10 usuários por 15s
        { duration: '2s', target: 100 },    // Spike: em 2s vamos de 10 a 100 usuários
        { duration: '3s', target: 100 },    // Spike: manter 100 usuários por 3s
        { duration: '5s', target: 10 },     // Average: em 5s vamos de 100 a 10 usuários
        { duration: '5s', target: 0 },      // Ramp up: em 5s vamos de 10 a 0 usuários
    ]
    ```
8. **Reaproveitamento de Resposta**: Utiliza dados obtidos em uma requisição para alimentar outras requisições, simulando fluxos de trabalho reais, vemos no arquivo **dois**:
    ```javascript
    // Após o login, reutiliza-se o token para cadastrar um pet
    group('Login Usuário', function () {
        const res = login(email, senha);
        check(res, {
            'Login com sucesso status 200': (r) => r.status === 200,
            'Login tem token': (r) => r.json('token') !== undefined,
        });
        token = res.json('token');
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
    ```
9. **Uso de Token de Autenticação**: Implementa autenticação baseada em tokens para proteger endpoints e simular usuários autenticados, vemos no arquivo **dois**:
    ```javascript
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
    ```
10. **Data-Driven Testing**: Técnica que utiliza conjuntos de dados variados para testar diferentes cenários com o mesmo script, vemos no arquivo **um**:
    ```javascript
    import { SharedArray } from 'k6/data';

    // Carrega os dados de login a partir de um arquivo JSON
    const users = new SharedArray ('users', function () {
        return JSON.parse(open('./data/login.test.data.json'));
    });

    // Seleciona os usuários para o teste
    const res = http.post(
        `${__ENV.BASE_URL}/auth/login`,
        JSON.stringify({
            email,
            password 
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    ```
11. **Groups**: Organiza o teste em seções lógicas, facilitando a leitura e análise dos resultados. Vemos no arquivo **dois**:
    ```javascript
    import { group } from 'k6';

    group('Cadastrar Novo Pet', function () {
        const url = `${getBaseUrl()}/pets`;
        const payload = JSON.stringify({
            idTag: randomIdTag(),
            name: randomName(),
            species: randomSpecies(),
            birthDate: randomBirthDate(),
            vaccines: randomVaccines(),
        });
    group('Listar Pets do Usuário', function () {
        const url = `${getBaseUrl()}/pets`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    ```

# Integração Contínua (CI) — GitHub Actions

Este projeto utiliza o **GitHub Actions** para automação de testes, build e geração de relatórios de performance. O workflow principal está definido em `.github/workflows/node.yml` e executa automaticamente nas branches `main` para push e pull request.

### Principais etapas do workflow:

- **Checkout do código:** Baixa o repositório para o runner.
- **Configuração do Node.js:** Usa Node.js 20.x para garantir ambiente consistente.
- **Instalação de dependências:** Executa `npm install` para instalar todas as dependências do projeto.
- **Instalação do k6:** Instala o k6 para testes de performance.
- **Subida da API:** Executa o servidor da API em background.
- **Execução dos testes automatizados:** Roda os testes de unidade e integração com `npm test`.
- **Testes de performance (k6):**
    - Executa os scripts de performance localmente e via ação do k6, gerando dashboards HTML.
    - Usa variáveis de ambiente para configurar o dashboard e exportar relatórios.
- **Upload de relatórios:** Os arquivos HTML gerados pelos testes de performance são enviados como artefatos do workflow.

#### Exemplo de artefatos gerados:
- `trabalho-final-da-disciplina.test-dashboard.html`
- `login.test-dashboard.html`

Esses relatórios podem ser baixados diretamente na interface do GitHub Actions após a execução do workflow.
- Na seção: **Upload dos relatórios de testes em html do k6**
  - Artifact download URL

## Dicas rápidas

- **data\users.json** caso perca os usuários da base de dados, aqui estão os usuários salvos e podem ser usados para testes:
    ````json
    [
    {
        "id": "f8f28a9a-cf7c-414a-a3e7-c8ae8c88f66b",
        "email": "judgespencer@morissette.net",
        "password": "$2a$10$0kspHw6EGOpmF9/WD5a8m.JWvBMWSFOyvLIAx50TDbfKdISXOHWU6"
    },
    {
        "id": "7edabae6-bbb8-4c43-b4b4-7c59cb52fa1e",
        "email": "verdazieme@baumbach.biz",
        "password": "$2a$10$EgLaAdwUbz98auWssb67v.esfWTnAmyP2y7fJ7u5Scm8clk8.en8C"
    },
    {
        "id": "bd5283f1-1acc-4915-8736-a4ef00043cb5",
        "email": "nelswehner@sipes.net",
        "password": "$2a$10$dbq4h7Ck2aolwlKUeHbTye/1dZTM3/b4qZHs0U9DtRVx.UdW0/1ZS"
    }
    ]
    ````
- Ou pode registrar novos usuários via endpoint `POST /auth/register` na documentação Swagger em `http://localhost:3000/api-docs`.