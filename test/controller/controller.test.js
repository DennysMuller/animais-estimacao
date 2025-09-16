const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;

const petController = require('../../rest/controllers/petController');
const petService = require('../../src/services/petService');

describe('Pet Controller - Testes de Unidade', () => {
    let createPetStub;

    // Antes de cada teste, criamos um stub para a função do service
    beforeEach(() => {
        createPetStub = sinon.stub(petService, 'createPet');
    });

    // Depois de cada teste, restauramos a função original
    afterEach(() => {
        createPetStub.restore();
    });

    it('Deve chamar petService.createPet e retornar 201 em caso de sucesso', () => {
        const req = {
            body: { idTag: 'T1', name: 'Bolinha', species: 'gato' },
            user: { email: 'test@user.com' } // Mock do usuário vindo do middleware
        };
        // Mock dos métodos do objeto res
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        const newPet = { ...req.body, ownerEmail: req.user.email };
        createPetStub.returns(newPet); // O que o service deve retornar

        petController.create(req, res);

        // Verificações
        // Usamos sinon.match para verificar se o objeto passado contém as propriedades de req.body
        expect(createPetStub.calledOnceWith(sinon.match(req.body), req.user.email)).to.be.true;
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(newPet)).to.be.true;
    });

    it('Deve retornar 409 se o petService lançar um erro de duplicidade', () => {
        const req = {
            body: { idTag: 'T1', name: 'Bolinha', species: 'gato' },
            user: { email: 'test@user.com' }
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        // Simulamos o service lançando um erro
        const errorMessage = 'Já existe um pet com esta placa de identificação.';
        createPetStub.throws(new Error(errorMessage));

        petController.create(req, res);

        expect(res.status.calledWith(409)).to.be.true;
        expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
});