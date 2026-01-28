const express = require('express');
const faker = require('faker');

const app = express();

let messages = []; // Хранилище сообщений

// Функция для генерации нового сообщения
function generateMessage() {
    return {
        id: faker.datatype.uuid(),
        from: faker.internet.email(),
        subject: faker.lorem.words(3),
        body: faker.lorem.paragraph(),
        received: Math.floor(Date.now() / 1000),
    };
}

// Генерация сообщений каждые 3 секунды
setInterval(() => {
    const newMessage = generateMessage();
    messages.push(newMessage);
}, 3000);

// Endpoint для получения всех сообщений
app.get('/api/messages/unread', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: Math.floor(Date.now() / 1000),
        messages,
    });
});

// Запуск сервера
module.exports = app;