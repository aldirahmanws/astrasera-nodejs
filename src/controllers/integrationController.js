const sentry = require("@sentry/node");

const integrationService = require("../services/integrationService");

exports.register = async (req, res, next) => {
    try {
        const { body } = req;
        if (
            !body.email ||
            !body.password
        ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        const register = {
            email: body.email,
            password: body.password
        };

        const registerUser = await integrationService.register(register);
        if (!registerUser.status) {
            return res.status(400).json(registerUser);
        }
        return res.status(200).json(registerUser);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};
exports.login = async (req, res, next) => {
    try {
        const { body } = req;
        if (
            !body.email ||
            !body.password
        ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        const login = {
            email: body.email,
            password: body.password
        };

        const loginUser = await integrationService.login(login);
        if (!loginUser.status) {
            return res.status(400).json(loginUser);
        }
        return res.status(200).json(loginUser);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};