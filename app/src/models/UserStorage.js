"use strict";

const db = require("../config/db.js");

class UserStorage {

    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const sql = "select * from users where id = @id;";
            db.request()
                .input("id", id)
                .query(sql, (err, data) => {
                    if (err) reject(`${err}`);
                    else resolve(data.recordset[0]);
                });
        });1
    };

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const sql = "insert into users(id, name, psword) values(@id, @name, @psword);";
            db.request()
                .input("id", userInfo.id)
                .input("name", userInfo.name)
                .input("psword", userInfo.psword)
                .query(sql, (err) => {
                    if (err) reject (`${err}`);
                    else resolve({ success: true });
                });
        });
    };

    static async checkId(id) {
        return new Promise((resolve, reject) => {
            const sql = "select id from users where id = @id";
            db.request()
                .input("id", id)
                .query(sql, (err, data) => {
                    if (err) reject (`${err}`);
                    else resolve(data.recordset[0]);
                })
        });
    };
}
    
module.exports = UserStorage;