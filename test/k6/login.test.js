// Teste de performance K6 para fazer login
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check, sleep } from 'k6';
import { getBaseUrl } from './helpers/baseUrlHelper.js';

const users = new SharedArray ('users', function () {
    return JSON.parse(open('./data/login.test.data.json'));
})

export let options = {
    // vus: 10,
    // iterations: 50,
    thresholds: {
        http_req_duration: ['p(95)<20000', 'p(90)<16000'], // 95% dos requests devem ser < 2s e 90% dos requests devem ser < 1,6
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

export default function() {
    // const user = users(__VU - 1);                // Número de VUs igual a número de itens no JSON
    const user = users[(__VU - 1) % users.length];  // Reaproveitamento de dados
    // console.log(user);

    const email = user.email;
    const password = user.password;

    const res = http.post(
        `${getBaseUrl()}/auth/login`,
        JSON.stringify({
            email,
            password 
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    // console.log(res.body);
    check(res, {'Login com sucesso status 200': (r) => r.status === 200 });
    
    sleep(1);
}