const request = require('supertest');
const { expect } = require('chai');
const app = require('../../rest/app');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const userDbPath = path.join(__dirname, '../..', 'data', 'users.json');
const petDbPath = path.join(__dirname, '../..', 'data', 'pets.json');

describe('API external Tests', () => {
    let token;
    const testUser = { email: 'external@test.com', password: 'password123' };

    // Limpa os bancos de dados antes de começar os testes
    before((done) => {
        fs.writeFileSync(userDbPath, '[]', 'utf8');
        fs.writeFileSync(petDbPath, '[]', 'utf8');

        // Registra um usuário e faz login para obter o token
        request(process.env.BASE_URL_REST)
            .post('/auth/register')
            .send(testUser)
            .end(() => {
                request(process.env.BASE_URL_REST)
                    .post('/auth/login')
                    .send(testUser)
                    .end((err, res) => {
                        token = res.body.token;
                        done();
                    });
            });
    });

    it('POST /pets - Deve criar um novo pet com sucesso', (done) => {
        const newPet = {
            idTag: "external-001",
            name: "Fido",
            species: "cão"
        };

        request(app)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send(newPet)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.equal('Fido');
                expect(res.body.ownerEmail).to.equal(testUser.email);
                done();
            });
    });

    it('GET /pets - Deve retornar 401 sem um token de autenticação', (done) => {
        request(process.env.BASE_URL_REST)
            .get('/pets')
            .expect(401, done);
    });
});