// Funções helpers para geração de dados aleatórios para K6
import { Faker } from 'k6/x/faker';

let faker = new Faker();

export function randomEmail() {
    // Usa __VU e __ITER para garantir unicidade
    return `VU-${__VU}_ITER-${__ITER}_funcaoGerarNumeroAleatorio${Math.floor(Math.random() * 10000)}_${faker.person.email()}`;
}

export function randomIdTag() {
    return `IDTAG_${__VU}_${__ITER}_${Math.floor(Math.random() * 10000)}`;
}

export function randomName() {
    // const nomes = ["Rex", "Bolt", "Max", "Luna", "Nina", "Thor", "Mel", "Bob"];
    const nomes = [`${faker.animal.petName()}`, `${faker.animal.petName()}`, `${faker.animal.petName()}`, `${faker.animal.petName()}`];
    // return nomes[Math.floor(Math.random() * nomes.length)] + `_${__VU}_${__ITER}`;
    return `VU-${__VU}_ITER-${__ITER}_${nomes[Math.floor(Math.random() * nomes.length)]}`;
}

export function randomSpecies() {
    // const especies = ["Cão", "Gato", "Pássaro", "Peixe", "Coelho", "Hamster"];
    const especies = [`${faker.animal.bird()}`, `${faker.animal.cat()}`, `${faker.animal.dog()}`, `${faker.animal.farmAnimal()}`, `${faker.animal.animal()}`, `${faker.zen.animal()}`];
    return especies[Math.floor(Math.random() * especies.length)];
}

export function randomBirthDate() {
    // Gera datas entre 2015 e 2023
    // const year = Math.floor(Math.random() * 9) + 2015;
    // const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    // const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
    // return `${year}-${month}-${day}`;
    const dataISO = faker.time.dateRange('2015-01-01', '2025-12-31');
    // Converte para o formato pt-BR
    const data = new Date(dataISO);
    const dataBR = data.toLocaleDateString('pt-BR');
    return dataBR;
}

export function randomVaccines() {
    const vacinas = ["Raiva", "V10", "V8", "Gripe", "Leptospirose", "Giárdia"];
    // Seleciona entre 1 e 3 vacinas aleatórias
    const qtd = Math.floor(Math.random() * 3) + 1;
    const escolhidas = [];
    while (escolhidas.length < qtd) {
        const v = vacinas[Math.floor(Math.random() * vacinas.length)];
        if (!escolhidas.includes(v)) escolhidas.push(v);
    }
    return escolhidas;
}
