const express = require('express');
const cors = require('cors');
const config = require('./config');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(authRoutes);
app.use(categoryRoutes);
app.use(orderRoutes);

app.listen(config.PORT, async () => {
    console.log('Server is running on http://localhost:' + config.PORT);
    await sequelize.authenticate();
    console.log('Database connected');
});