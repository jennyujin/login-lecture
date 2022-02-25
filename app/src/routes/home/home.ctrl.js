"use strict";

const logger = require("../../config/logger");
const User = require("../../models/Users");

const output = {
    home: (req, res) => {
        logger.info(`GET / 304 "Move to Home page"`);
        res.render("home/index");
    },

    login: (req, res) => {
        logger.info(`GET / 304 "Move to Login page"`);
        res.render("home/login");
    },

    register: (req, res) => {
        logger.info(`GET / 304 "Move to Register page"`);
        res.render("home/register");
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        }

        log(response, url);
        return res.status(url.status).json(response);
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 409 : 201,
        }

        log(response, url);
        return res.status(url.status).json(response);
    },
};

module.exports = {
    output,
    process,
};

const log = (response, url) => {
    if (response.err) {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
            );

    }
    else {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${
                response.msg || ""
            }`
            );
    }
};