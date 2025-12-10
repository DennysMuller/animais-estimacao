import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { getBaseUrl } from './helpers/baseUrlHelper.js';
import { randomEmail, randomIdTag, randomName, randomSpecies, randomBirthDate, randomVaccines } from './helpers/randomHelpers.js';
import { login } from './helpers/loginHelper.js';

const petPostTrend = new Trend('pet_post_duration', true);

export let options = {
    // vus: 1,
    // iterations: 1,
    // duration: '15s',
    thresholds: {
        http_req_duration: ['p(95)<20000', 'p(90)<16000'], // 95% dos requests devem ser < 2, 90% dos requests devem ser < 1,6s
        pet_post_duration: ['p(95)<5000'], // 95% dos posts checkout devem ser < 5s
        'checks': ['rate==1'], // Todos os checks devem passar
    },
        stages: [
        { duration: '3s', target: 10 },     // Ramp up
        { duration: '15s', target: 10 },    // Average
        { duration: '2s', target: 100 },    // Spike
        { duration: '3s', target: 100 },    // Spike
        { duration: '5s', target: 10 },     // Average
        { duration: '5s', target: 0 },      // Ramp up
    ],
};


export default function () {
    let token = null;
    let email = randomEmail();
    let senha = 'senha123';

    group('Registrar Usuário', function () {
        const url = `${getBaseUrl()}/auth/register`;
        const payload = JSON.stringify({ 
          email: email, 
          password: senha 
        });
        const params = { 
          headers: { 'Content-Type': 'application/json' } };
        const res = http.post(url, payload, params);
        check(res, {
            'Registrar com sucesso status 201': (r) => r.status === 201,
        });
        // console.log(res.request);
        // console.log(randomEmail());
    });

    group('Login Usuário', function () {
        const res = login(email, senha);
        check(res, {
            'Login com sucesso status 200': (r) => r.status === 200,
            'Login tem token': (r) => r.json('token') !== undefined,
        });
        token = res.json('token');
    });

    group('Cadastrar Novo Pet', function () {
        const url = `${getBaseUrl()}/pets`;
        const payload = JSON.stringify({
            idTag: randomIdTag(),
            name: randomName(),
            species: randomSpecies(),
            birthDate: randomBirthDate(),
            vaccines: randomVaccines(),
        });
        const params = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const res = http.post(url, payload, params);
        petPostTrend.add(res.timings.duration);
        check(res, {
            'Pet cadastrado com sucesso status 201': (r) => r.status === 201,
            'Pet possui id': (r) => r.json('idTag') !== undefined,
        });
    });

    group('Listar Pets do Usuário', function () {
        const url = `${getBaseUrl()}/pets`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = http.get(url, params);
        check(res, {
            'Listar os pets por usuário status 200': (r) => r.status === 200,
            // Confirma que a resposta da API é uma lista (array) de pets.
            // Para cada pet da lista, verifica se a proprieda ownerEmail (dono do pet)
            // é igual ao e-mail do usuário logado
            'Listar todos os pets do usuário': (r) => Array.isArray(r.json()) &&
               r.json().every(pet => pet.ownerEmail === email),
        });
        // console.log(res.json().map(pet => pet.ownerEmail));
    });

    sleep(1);
}
