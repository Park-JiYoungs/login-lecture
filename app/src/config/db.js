"use strict";

const sql = require("mssql");

const db = new sql.ConnectionPool({
    user: process.env.DB_USER, // DB 사용자 이름
    password: process.env.DB_PSWORD, // DB 사용자의 암호
    server: process.env.DB_HOST, // DB 서버주소 
    database: process.env.DB_DATABASE, // DB 데이터베이스 이름
    options: {
        encrypt: false, // DB 서버주소가 IP일 경우 에러 방지
        trustServerCertificate: true, // 자체 신뢰 서버 인증
    }
});

db.connect((err) => {
    // 연결이 안될 경우 에러 내용 콘솔에 출력
    if(err) {
        console.err("Connect Error:", err);
        return;
    }
    // 연결에 성공할 경우 성공 메세지 콘솔에 출력
    console.log("Connected to DataBase!");
});

module.exports = db;