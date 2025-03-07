// app.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para lidar com JSON
app.use(express.json());

// URL da API da Dark Coin da main net
const darkCoinAPIUrl = process.env.DARKCOIN_API_URL;
const apiKey = process.env.DARKCOIN_API_KEY;

// Rota para obter o saldo
app.get('/balance', async (req, res) => {
    try {
        const response = await axios.get(`${darkCoinAPIUrl}/balance`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao consultar o saldo');
    }
});

// Rota para realizar uma transação
app.post('/transaction', async (req, res) => {
    const { amount, recipient } = req.body;

    if (!amount || !recipient) {
        return res.status(400).send('Valor e destinatário são obrigatórios');
    }

    try {
        const response = await axios.post(`${darkCoinAPIUrl}/transaction`, {
            amount,
            recipient
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao realizar transação');
    }
});

// Iniciar o servidor Express
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
