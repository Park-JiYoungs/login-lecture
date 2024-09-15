"use strict";

class UserStorage {
    static #users = {
        id: ["piy0305", "oky9918", "교촌치킨"],
        psword: ["studying", "working", "허니콤보"],
        name: ["박지영", "유점옥", "안락점"]
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}
    
module.exports = UserStorage;