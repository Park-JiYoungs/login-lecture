"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            if (!client.id) return { success: false, msg: "아이디를 입력해 주세요."};
            if (!client.psword) return { success: false, msg: "비밀번호를 입력해 주세요."};
            const { id, psword } = await UserStorage.getUserInfo(client.id); 
    
            if (id) {
                if (id === client.id && psword === client.psword) {
                    return { success: true };
                }
                return { success: false, msg: "비밀번호가 틀렸습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch(err) {
            return { success: false, msg: err };
        }
        
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            const a = { success: false, msg: err };
            return a;
        }
        
    }
}

module.exports = User;