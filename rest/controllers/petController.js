const petService = require('../../src/services/petService');

const create = (req, res) => {
    const { idTag, name, species, birthDate, vaccines } = req.body;
    if (!idTag || !name || !species) {
        return res.status(400).json({ message: 'Placa de identificação, nome e tipo são obrigatórios.' });
    }

    try {
        const ownerEmail = req.user.email; // Do middleware JWT
        const newPet = petService.createPet({ idTag, name, species, birthDate, vaccines }, ownerEmail);
        res.status(201).json(newPet);
    } catch (error) {
        if (error.message.includes('placa de identificação')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const getAll = (req, res) => {
    try {
        const ownerEmail = req.user.email;
        const pets = petService.getPetsByOwner(ownerEmail);
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const getById = (req, res) => {
    try {
        const { idTag } = req.params;
        const ownerEmail = req.user.email;
        const pet = petService.getPetByIdAndOwner(idTag, ownerEmail);

        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado.' });
        }
        res.status(200).json(pet);
    } catch (error) {
        if (error.message.includes('não autorizado')) {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const update = (req, res) => {
    try {
        const { idTag } = req.params;
        const ownerEmail = req.user.email;
        const updatedPet = petService.updatePet(idTag, req.body, ownerEmail);

        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet não encontrado para atualização.' });
        }
        res.status(200).json(updatedPet);
    } catch (error) {
        if (error.message.includes('não autorizado')) {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const remove = (req, res) => {
    try {
        const { idTag } = req.params;
        const ownerEmail = req.user.email;
        const result = petService.deletePet(idTag, ownerEmail);

        if (result === null) {
            return res.status(404).json({ message: 'Pet não encontrado.' });
        }
        
        if (result) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Não foi possível remover o pet.' });
        }
    } catch (error) {
        if (error.message.includes('não autorizado')) {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = { create, getAll, getById, update, remove };