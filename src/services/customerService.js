const firebaseAdmin = require("firebase-admin");
const sentry = require("@sentry/node");

const db = firebaseAdmin.firestore();
const Customers = db.collection("customers");

exports.list = async () => {
    try {
        var data = [];
        const customers = await Customers.get();
        if (customers.docs.length > 0) {
            for (const customer of customers.docs) {
                data.push(customer.data());
            }
        }
        return {
            status: true,
            message: "Success to get customer",
            data: data,
        };
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to get customer",
        };
    }
};
exports.create = async (dataCustomer) => {
    try {
        const customers = await Customers.doc(dataCustomer.email).get();
        if (customers.data()) {
            return {
                status: false,
                message: "Duplicate email",
            };
        }
        await Customers.doc(dataCustomer.email).set(dataCustomer);
        return {
            status: true,
            message: "Success to create customer",
        };
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to create customer",
        };
    }
};
exports.read = async (customerEmail) => {
    try {
        const customer = await Customers.doc(customerEmail).get();
        if (!customer.data()) {
            return {
                status: false,
                message: "Customer not found",
            };
        }

        const data = customer.data();
        return {
            status: true,
            message: "Success to get detail Customer",
            data: data,
        };
    } catch (error) {
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to create customer",
        };
    }
};

exports.update = async (customerEmail, dataCustomer) => {
    try {
        const customer = await Customers.doc(customerEmail).get();
        if (!customer.data()) {
            return {
                status: false,
                message: "Customer not found",
            };
        }

        await Customers.doc(customerEmail).update(dataCustomer);
        return {
            status: true,
            message: "Success to update customer",
        };
    } catch (error) {
        console.log(error.message)
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to update customer",
        };
    }
};

exports.delete = async (customerEmail) => {
    try {
        const customer = await Customers.doc(customerEmail).get();
        if (!customer.data()) {
            return {
                status: false,
                message: "Customer not found",
            };
        }
        await Customers.doc(customerEmail).delete();
        return {
            status: true,
            message: "Success to delete customer"
        }
    } catch (error) {
        console.log(error.message)
        sentry.captureException(error);
        return {
            status: false,
            message: "Failed to delete customer"
        }
    }
}