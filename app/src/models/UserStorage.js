"use strict";

const db = require("../config/db.js");

class UserStorage {

    static getUserInfo(id) {
        return new Promise((resolve, reject) => {

            const query = "up_selectUserInfo";
            db.request()
                .input("id", id)
                .execute(sql, (err, data) => {
                    if (err) reject(`${err}`);
                    else resolve(data.recordset[0]);
                });
        });1
    };

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "up_insertUserInfo";
            const sql = db.request()
                .input("id", userInfo.id)
                .input("name", userInfo.name)
                .input("psword", userInfo.psword)
                .execute(query, (err, data) => {
                    if (err) reject (`${err}`);
                    else {
                        data = data.recordset[0];
                        resolve({ success: data.success, msg: data.msg });
                    }
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