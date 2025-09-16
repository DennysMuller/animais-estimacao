const fs = require('fs');
const path = require('path');

const petDbPath = path.join(__dirname, '..', '..', 'data', 'pets.json');

const readPets = () => {
    try {
        const data = fs.readFileSync(petDbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writePets = (pets) => {
    const dir = path.dirname(petDbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(petDbPath, JSON.stringify(pets, null, 2), 'utf8');
};

const findByIdTag = (idTag) => {
    const pets = readPets();
    return pets.find(pet => pet.idTag === idTag);
};

const findByOwnerEmail = (ownerEmail) => {
    const pets = readPets();
    return pets.filter(pet => pet.ownerEmail === ownerEmail);
};

const create = (pet) => {
    const pets = readPets();
    pets.push(pet);
    writePets(pets);
    return pet;
};

const update = (idTag, updatedPetData) => {
    let pets = readPets();
    const index = pets.findIndex(pet => pet.idTag === idTag);
    if (index === -1) return null;

    pets[index] = { ...pets[index], ...updatedPetData };
    writePets(pets);
    return pets[index];
};

const remove = (idTag) => {
    let pets = readPets();
    const initialLength = pets.length;
    pets = pets.filter(pet => pet.idTag !== idTag);
    if (pets.length === initialLength) return false;

    writePets(pets);
    return true;
};

module.exports = { findByIdTag, findByOwnerEmail, create, update, remove };