const fs = require('fs');
const path = require('path');

const userDbPath = path.join(__dirname, '..', '..', 'data', 'users.json');

const readUsers = () => {
    try {
        const data = fs.readFileSync(userDbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Se o arquivo não existir, retorna um array vazio
        return [];
    }
};

const writeUsers = (users) => {
    const dir = path.dirname(userDbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(userDbPath, JSON.stringify(users, null, 2), 'utf8');
};

const findByEmail = (email) => {
    const users = readUsers();
    return users.find(user => user.email === email);
};

const create = (user) => {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
    return user;
};

module.exports = { findByEmail, create };