const sentry = require("@sentry/node");

const authService = require("../services/authService");

exports.login = async(req, res, next) => {
    try {
        const { body } = req;
        if (!body.email || !body.password) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        const user = {
            email: body.email,
            password: body.password
        }

        const loginUser = await authService.loginUser(user);
        if(!loginUser.status){
            return res.status(400).json(loginUser)
        }
        return res.status(200).json(loginUser);
    } catch (error) {
        sentry.captureException(error);
        next(error)
    }
}
exports.checkLogin = async(req, res, next) => {
    try {
        return res.status(200).json({
            status: true,
            message: "success"
        });
    } catch (error) {
        sentry.captureException(error);
        next(error)
    }
}

exports.logout = async (req, res) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(400).json({
                status: false,
                message: "You have been logged out",
            });
        }
        const token = req.header("Authorization").replace("Bearer", "").trim();
        const removeToken = await authService.removeToken(token)
        if(!removeToken.status){
            return res.status(400).json({
                status: false,
                message: "You have been logged out",
            });
        }
        return res.status(200).json({
            status: true,
            message: "success"
        })
    } catch (error) {
        next(error)
    }
}