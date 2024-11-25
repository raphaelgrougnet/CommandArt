require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    SECRET_JWT: process.env.SECRET_JWT,
    NODE_ENV: process.env.NODE_ENV,
};