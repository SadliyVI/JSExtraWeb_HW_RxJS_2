const express = require('express');
const faker = require('faker');

const app = express();

let messages = [];

function generateMessage() {
    return {
        id: faker.datatype.uuid(),
        from: faker.internet.email(),
        subject: faker.lorem.words(3),
        body: faker.lorem.paragraph(),
        received: Math.floor(Date.now() / 1000),
    };
}

setInterval(() => {
    const newMessage = generateMessage();
    messages.push(newMessage);

    if (messages.length > 100) messages = messages.slice(-100);
}, 3000);

app.get('/api/messages/unread', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: Math.floor(Date.now() / 1000),
        messages,
    });
});

module.exports = app;