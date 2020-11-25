const mysql = require('mysql');
require('dotenv').config()
const connecting = () => {
    const conn = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME
    });
    conn.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    
    return conn;
}

module.exports = connecting;