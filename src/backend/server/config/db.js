const mongoose = require('mongoose');

const createConnection = () => {
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    logger();
}

const logger = () => {
    mongoose.connection.on('connected', () => console.log('Mongoose está conectado!'));
    mongoose.connection.on('error', error => console.error.bind(console, "Erro na conexão: " + error));
    mongoose.connection.on('disconnected', () => console.log("Mongoose foi desconectado por: "));
}

const closeConnection = (message,callback) => {
    mongoose.connection.close(() => {
        console.log(message);
        callback();
    });
}

module.exports = { createConnection, closeConnection };