const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sentry = require("@sentry/node");

const User = require("../models/userModel")

const createUser = async () => {
    try {
        const checkUser = await User.findOne({email: "aldi@gmail.com"})
        if(!checkUser){
            const user = new User()
            user.name = "Aldi"
            user.email = "aldi@gmail.com"
            user.password = await bcrypt.hash("aldi", 10);
            await user.save()
            console.log("User created successfully")
        }
        console.log("User created")
    } catch (error) {
        console.log(error.message)
    }
}
createUser()

exports.loginUser = async (dataUser) => {
    try {
        const user = await User.findOne({email: dataUser.email})
        if (!user) {
            return {
                status: false,
                message: "User not found"
            }
        }

        var check_password = await bcrypt.compare(
            dataUser.password,
            user.password
        );
        if (!check_password) {
            return {
                status: false,
                message: "Password wrong"
            }
        }
        const token = await jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1m",
            }
        );

        const responseLogin = {
            name: user.name,
            email: user.email,
            token: token,
        };

        var tokens = user.tokens
        tokens.push({token: token})
        user.tokens = tokens
        await user.save()

        return {
            status: true,
            message: "success",
            data: responseLogin
        };
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed login"
        }
    }
};

exports.removeToken = async (token) => {
    try {
        const user = await User.findOne({'tokens.token': token})
        if(!user){
            return {
                status: false,
                message: "Token not found"
            }
        }
        var tokens = user.tokens.filter((obj) => {
            if(obj.token == token){
            }
            return obj.token != token
        })
        user.tokens = tokens
        await user.save();

        return {
            status: true,
            message: "success"
        }
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to remove token"
        }
    }
}