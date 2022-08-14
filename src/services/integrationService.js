const sentry = require("@sentry/node");
var axios = require("axios");

exports.register = (dataRegister = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: "https://reqres.in/api/register",
            timeout: 1000 * 60,
            headers: {
                "Content-Type": "application/json",
            },
            data: dataRegister,
        })
            .then((response) => {
                resolve({
                    status: true,
                    message: "success",
                    data: response.data
                });
            })
            .catch((error) => {
                resolve({
                    status: false,
                    message: error.response.data.error,
                });
            });
    });
};
exports.login = (dataLogin = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: "https://reqres.in/api/login",
            timeout: 1000 * 60,
            headers: {
                "Content-Type": "application/json",
            },
            data: dataLogin,
        })
            .then((response) => {
                resolve({
                    status: true,
                    message: "success",
                    data: response.data
                });
            })
            .catch((error) => {
                resolve({
                    status: false,
                    message: error.response.data.error,
                });
            });
    });
};
