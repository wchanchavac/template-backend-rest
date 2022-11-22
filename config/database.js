'use strict'
// const fs = require('fs')
// const path = require('path')

module.exports = {
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB || '',
    host: process.env.DB_HOST || '',
    dialect: 'postgres',
    logging: console.log,
    port: process.env.DB_PORT,
    // schema: 'crud-user',
    // dialectOptions: {
    // ssl: {
    //   ca: fs.readFileSync(process.env.SSL_CERT_PATH || path.join(__dirname, '/cacert-2021-09-30.pem')),
    //   rejectUnauthorized: false
    // }
    // },
    pool: {
        max: 1,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
}