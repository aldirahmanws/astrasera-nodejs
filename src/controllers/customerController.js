const sentry = require("@sentry/node");

const customerService = require("../services/customerService");

exports.list = async (req, res, next) => {
    try {
        const customers = await customerService.list();
        if (!customers.status) {
            return res.status(400).json(customers);
        }
        return res.status(200).json(customers);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const { body } = req;
        if (
            !body.email ||
            !body.name ||
            !body.address ||
            !body.city ||
            !body.country
        ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        const customer = {
            email: body.email,
            name: body.name,
            address: body.address,
            city: body.city,
            country: body.country,
        };

        const createCustomer = await customerService.create(customer);
        if (!createCustomer.status) {
            return res.status(400).json(createCustomer);
        }
        return res.status(200).json(createCustomer);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};

exports.read = async (req, res, next) => {
    try {
        const { params } = req;
        if (!params.email) {
            return res.status(400).json({
                status: false,
                message: "Email not found",
            });
        }
        var customerEmail = params.email;
        const readCustomer = await customerService.read(customerEmail);
        if (!readCustomer.status) {
            return res.status(400).json(readCustomer);
        }
        return res.status(200).json(readCustomer);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { body, params } = req;
        if (!params.email) {
            return res.status(400).json({
                status: false,
                message: "Email not found",
            });
        }
        if (
            !body.name ||
            !body.address ||
            !body.city ||
            !body.country
        ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        var customerEmail = params.email;
        
        const customer = {
            name: body.name,
            address: body.address,
            city: body.city,
            country: body.country,
        };

        const updateCustomer = await customerService.update(
            customerEmail,
            customer
        );
        if (!updateCustomer.status) {
            return res.status(400).json(updateCustomer);
        }
        return res.status(200).json(updateCustomer);
    } catch (error) {
        console.log(error.message)
        sentry.captureException(error);
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { params } = req;
        if (!params.email) {
            return res.status(400).json({
                status: false,
                message: "Email not found",
            });
        }
        var customerEmail = params.email;

        const deletedCustomer = await customerService.delete(customerEmail);
        if (!deletedCustomer.status) {
            return res.status(400).json(deletedCustomer);
        }
        return res.status(200).json(deletedCustomer);
    } catch (error) {
        sentry.captureException(error);
        next(error);
    }
};
