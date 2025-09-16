const petModel = require('../models/petModel');

const createPet = (petData, ownerEmail) => {
    const { idTag } = petData;

    const existingPet = petModel.findByIdTag(idTag);
    if (existingPet) {
        throw new Error('Já existe um pet com esta placa de identificação.');
    }

    const newPet = {
        ...petData,
        ownerEmail, // Garante que o dono é o usuário autenticado
    };

    return petModel.create(newPet);
};

const getPetsByOwner = (ownerEmail) => {
    return petModel.findByOwnerEmail(ownerEmail);
};

const getPetByIdAndOwner = (idTag, ownerEmail) => {
    const pet = petModel.findByIdTag(idTag);
    if (!pet) {
        return null; // Pet não encontrado
    }

    // Regra de negócio: dono só pode ver seu próprio pet
    if (pet.ownerEmail !== ownerEmail) {
        throw new Error('Acesso não autorizado a este pet.');
    }

    return pet;
};

const updatePet = (idTag, petData, ownerEmail) => {
    const pet = getPetByIdAndOwner(idTag, ownerEmail); // Reutiliza a lógica de verificação
    if (!pet) {
        return null; // Se a verificação retornar nulo (não encontrado)
    }

    // Não permite alterar o dono ou a placa de identificação
    delete petData.ownerEmail;
    delete petData.idTag;

    return petModel.update(idTag, petData);
};

const deletePet = (idTag, ownerEmail) => {
    const pet = getPetByIdAndOwner(idTag, ownerEmail); // Reutiliza a lógica de verificação
    if (!pet) {
        return null;
    }

    return petModel.remove(idTag);
};

module.exports = { createPet, getPetsByOwner, getPetByIdAndOwner, updatePet, deletePet };