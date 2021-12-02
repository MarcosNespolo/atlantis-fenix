const express = require('express');
const cors = require('cors'); // Cors middleware, permite receber e enviar arquivos JSON
const cookieParser = require('cookie-parser');
const mongoDb = require('./config/db');

// Inicializa módulos
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Estabelece conexão com MongoDB
mongoDb.createConnection();

// Rotas de requisição HTTP
const aquariosRouter = require('../routes/aquarios');
const tipoAquariosRouter = require('../routes/tipoAquarios');
const especiesRouter = require('../routes/especies');
const itensRouter = require('../routes/itens');
const usuariosRouter = require('../routes/usuarios');
const opcoesRouter = require('../routes/opcoes');
app.use('/aquarios', aquariosRouter);
app.use('/tipoAquarios', tipoAquariosRouter);
app.use('/especies', especiesRouter);
app.use('/itens', itensRouter);
app.use('/usuarios', usuariosRouter);
app.use('/opcoes', opcoesRouter);

// Inicia o server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});

// Fecha conexão caso a execução seja interrompida
process.on('SIGUSR2', () => mongoDb.closeConnection('nodemon restart', ()=> process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => mongoDb.closeConnection('execução foi interrompida', ()=> process.exit(0)));
