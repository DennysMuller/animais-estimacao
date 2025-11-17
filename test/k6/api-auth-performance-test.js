import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

export const options = {
  vus: 10,
  duration: '30s',
  //iterations: 1,
  thresholds: {
    'http_req_duration': ['p(90)<25', 'p(95)<50'], 
    'group_duration{group::login}': ['p(95)<30'],
    'group_duration{group::atividade}': ['p(95)<40'],
    'group_duration{group::Simula o pensamento do usuário}': ['p(95)<40'],
    'http_req_failed': ['rate<0.01'],
  },
};

function dataAleatoria(inicio, fim) {
  const date = new Date(inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime()));
  const day = String(date.getDate()).padinicio(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses em JavaScript começam do 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function setup() {
  const dadosUsuario = JSON.stringify({
    email: `novousuario${Date.now()}@gmail.com`,
    password: '1234'
  });

  const headersUsuario = {
      headers: {
      'Content-Type': 'application/json',
    }
  };

  let registrarUsuario = http.post('http://localhost:3000/auth/register', dadosUsuario, headersUsuario );
  check(registrarUsuario, {
    'status é 201': (r) => r.status === 201,
    'confirmação de cadastro: retorna o email correto': (r) => r.json().email === JSON.parse(dadosUsuario).email
  });
  expect.soft(registrarUsuario.status).toBe(201);
  
  let realizarLogin = http.post('http://localhost:3000/auth/login', dadosUsuario, headersUsuario);
    check(realizarLogin, {
    'status é 200': (r) => r.status === 200,
    'confirmação de login: retorna um token': (r) => 'token' in r.json()
  });
  expect.soft(realizarLogin.status).toBe(200);

  const token = realizarLogin.json().token;
  console.log(token);
  return { token: token };
};   
  
export default function(dados) {
  const dadosPet = JSON.stringify({
      // __VU: O número de identificação do usuário virtual.
      // __ITER: O número da iteração (quantas vezes aquele usuário já rodou o teste).
      idTag: `${__VU}-${__ITER}`,
      name: 'Rex',
      species: 'cão',
      birthDate: dataAleatoria,
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

  let cadastrarPet = http.post('http://localhost:3000/pets', dadosPet, headersPet);
  check(cadastrarPet, { 
    "status é 201": (res) => res.status === 201,
    "confirmação de criação de pet: retorna a idTag correta": (res) => res.json().idTag === JSON.parse(dadosPet).idTag
  });

  expect.soft(cadastrarPet.status).toBe(201);
  
  group('Simula o pensamento do usuário', function() {
    sleep(1); // User Think Time
  });
}
