const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const cors = require('cors');
const morgan = require('morgan')
const server = express();

server.use(express.json());

server.use(cors()); 
server.use(morgan('dev')); 

server.use('/api/accounts', accountsRouter)

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not found',
    })

})

module.exports = server;
