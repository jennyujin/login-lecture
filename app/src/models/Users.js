"use strict";

const { response } = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const { id, psword } = await UserStorage.getUserInfo(client.id);

            if (id) {
                if (id === client.id && psword === client.psword){
                    return { success: true };
                }
                return { success: false, msg: "password is incorrect"};
            }
            return { success: false, msg: "id is not existed"};
        } catch (err) {
            return { success: false, err };
    }
    }

    async register() {
        const client = this.body;
        try { 
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: err};
        }
    }
}

module.exports = User;