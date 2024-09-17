"use strict";

const db = require("../config/db.js");
const sql = require("mssql");

class UserStorage {

    static getUserInfo(id) {
        const query = "select * from users where id = @id;";
        return db
            .then(pool => {
                return pool.request()
                    .input("id",sql.VarChar, id)
                    .query(query);
            })
            .then(result => {
                if (result.recordset.length > 0) {
                    return result.recordset[0];
                }
                return null;
            })
            .catch(err => {
                console.error("SQL ERROR", err);
                throw `${err}`;
            })
    }

    static async save(userInfo) {
        const query = "insert into users(id, name, psword) values(@id, @name, @psword);";
        return db
            .then(pool => {
                return pool.request()
                    .input("id",sql.VarChar, userInfo.id)
                    .input("name",sql.NVarChar, userInfo.name)
                    .input("psword",sql.NVarChar, userInfo.psword)
                    .query(query);
            })
            .then(result => {
                return { success: true };
            })
            .catch(err => {
                console.error("SQL ERROR", err);
                throw `${err}`;
            })
    }
}
    
module.exports = UserStorage;