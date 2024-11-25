const express = require('express');
const cors = require('cors');
const config = require('./config');
const { sequelize } = require('./models');

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(config.PORT, async () => {
    console.log('Server is running on http://localhost:3000');
    await sequelize.authenticate();
    console.log('Database connected');
});