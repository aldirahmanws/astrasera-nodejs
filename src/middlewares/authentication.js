const jwt = require("jsonwebtoken");

const User = require("../models/userModel")

const checkJwt = (token) => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err){
                resolve(false)
            }
            resolve(decoded)
        })
    });
};

const authentication = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        const token = req.header("Authorization").replace("Bearer", "").trim();
        const decoded = await checkJwt(token)
        if(!decoded){
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        
        const user = await User.findOne({
            _id: decoded.userId,
            "tokens.token": token,
        });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized",
        });
    }
};

module.exports = authentication;