const {parsed: env} = require('dotenv').config();
const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: env.HOST,
    port: env.PORT,
    user: env.USER,
    password: env.PASSWORD,
    database: 'electrondb'
});

function getConnection(){
    return connection;
}

module.exports = { getConnection };
