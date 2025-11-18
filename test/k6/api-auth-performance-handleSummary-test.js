import http from 'k6/http';
import { Faker } from 'k6/x/faker';
import { sleep, check, group } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export const options = {
  vus: 10,
  duration: '30s',
  //iterations: 1,
  thresholds: {
    'http_req_duration': ['p(90)<125', 'p(95)<150'], 
      'group_duration{grupo::registro de usuário}': ['p(90)<10','p(95)<15'],
      'group_duration{grupo::realizar login}': ['p(90)<8','p(95)<10'],
      'group_duration{grupo::cadastrar pet}': ['p(90)<10','p(95)<20'],
      'group_duration{grupo::Simula o pensamento do usuário}': ['p(90)<1','p(95)<5'],
    'http_req_failed': ['rate<0.01'],
  },
};

function dataAleatoria(inicio, fim) {
  const date = new Date(inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime()));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses em JavaScript começam do 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function setup() {
  return group('Setup', function() {
    const emailUsuario = new Faker();
    const dadosUsuario = JSON.stringify({
      email: emailUsuario.person.email(),
      password: '1234'
    });

    const headersUsuario = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    let token = null;

    group('registro de usuário', function() {
      let registrarUsuario = http.post('http://localhost:3000/auth/register', dadosUsuario, headersUsuario );
      check(registrarUsuario, {
        'status é 201': (r) => r.status === 201,
        'confirmação de cadastro: retorna o email correto': (r) => r.json().email === JSON.parse(dadosUsuario).email
      });
      expect.soft(registrarUsuario.status).toBe(201);
    });

    group('realizar login', function() {
      let realizarLogin = http.post('http://localhost:3000/auth/login', dadosUsuario, headersUsuario);
      check(realizarLogin, {
        'status é 200': (r) => r.status === 200,
        'confirmação de login: retorna um token': (r) => 'token' in r.json()
      });
      expect.soft(realizarLogin.status).toBe(200);
      token = realizarLogin.json().token;
    });

    return { token: token };
  });
};   
  
export default function(dados) {
  // Instância do faker (pode passar uma seed: new Faker(123))
  const faker = new Faker();
  const sufuxoUnico = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const dadosPet = JSON.stringify({
    // __VU: O número de identificação do usuário virtual.
    // __ITER: O número da iteração (quantas vezes aquele usuário já rodou o teste).
    idTag: `${__VU}-${__ITER}-${sufuxoUnico}`,
    name: faker.animal.petName(),
    species: faker.animal.animal(),
    birthDate: dataAleatoria(new Date(2020, 0, 1), new Date()),
    vaccines: [
      'Raiva',
      'V10'
    ]
  });
    const headersPet = {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${dados.token}`
    }
  };

  group('cadastrar pet', function() {
    let cadastrarPet = http.post('http://localhost:3000/pets', dadosPet, headersPet);
    check(cadastrarPet, { 
      "status é 201": (res) => res.status === 201,
      "confirmação de criação de pet: retorna a idTag correta": (res) => res.json().idTag === JSON.parse(dadosPet).idTag
    });

    expect.soft(cadastrarPet.status).toBe(201);
  });

  group('Simula o pensamento do usuário', function() {
    sleep(1); // User Think Time
  });
}

export function handleSummary(data) {
  console.log('Preparando resumo...');

  // Extraindo métricas para o resumo customizado
  const requisicoes = data.metrics.http_reqs.values.count;
  const falhas = data.metrics.http_req_failed.values.passes;
  const duracaoP90 = data.metrics.http_req_duration.values['p(90)'];
  const duracaoP95 = data.metrics.http_req_duration.values['p(95)'];
  const grupoDurationP90 = data.metrics.group_duration.values['p(90)'];
  const grupoDurationP95 = data.metrics.group_duration.values['p(95)'];

  // Montando o resumo para o terminal (stdout)
  const sumarioPadronizado = `
  -------------------------------------------------
  Resumo Customizado da Execução
  -------------------------------------------------
  - Requisições totais: ${requisicoes}
  - Requisições com falha: ${falhas}
  - Duração de requisição p(90): ${duracaoP90.toFixed(2)} ms
  - Duração de requisição p(95): ${duracaoP95.toFixed(2)} ms
  - Duração de grupo p(90): ${grupoDurationP90.toFixed(2)} ms
  - Duração de grupo p(95): ${grupoDurationP95.toFixed(2)} ms
  -------------------------------------------------`;

  return {
    // Grava um resumo legível no stdout, e adiciona o nosso resumo customizado
    'stdout': textSummary(data, { indent: ' ', enableColors: true }) + sumarioPadronizado,
    // Opcional: salve também o resumo completo em JSON
    // 'summary.json': JSON.stringify(data, null, 2)
  };
}