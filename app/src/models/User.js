"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);
    
            if (user) {
                if (user.id === client.id && user.psword === client.psword) {
                    return { success: true };
                }
                return { success: false, msg: "비밀번호가 틀렸습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch(err) {
            return { success: false, err };
        };
    };

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return { success: response.success, msg: response.msg };
        } catch (err) {
            const a = { success: false, err };
            return a;
        };
    };

    async checkId() {
        const client = this.body;
        try {
            const chkID = await UserStorage.checkId(client.id);
            
            if (!chkID) return { success: true, msg: "사용가능한 아이디입니다." };
            else return { success: false, msg: "이미 사용중인 아이디입니다. "};
        } catch(err) {
            return { success: false, err };
        };
    };
}

module.exports = User;