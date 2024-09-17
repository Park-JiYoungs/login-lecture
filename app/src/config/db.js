"use strict";

const mssql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

const db = new mssql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("mssql connection success");
        return pool;
    })
    .catch(err => {
        console.error("mssql failed..");
    });

module.exports = db;