const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebaseAdmin = require("firebase-admin");
const sentry = require("@sentry/node");
const mongoose = require("mongoose");

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const firebaseCredential = require("./firebase-adminsdk.json");

sentry.init({
    dsn: "https://b585502ddcac4daea56f692e55956282@o1355780.ingest.sentry.io/6640603",
    tracesSampleRate: 1.0,
});
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseCredential),
});
const app = express();
const routes = require("./src/routes/indexRoute");
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
        
    })
    .catch((err) => {
        sentry.captureException(err)
        console.log("Cannot connect to the database!", err);
    });

const db = firebaseAdmin.firestore();

//Handle Form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handle Cors
app.use(cors());

app.use("/", routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle Error
app.use((req, res, next) => {
    return res.status(400).json({
        status: false,
        message: "Not found"
    })
});
app.use((err, req, res, next) => {
    console.log(err.message)
    sentry.captureException(err);
    res.status(err.status || 500).json({
        status: false,
        message: "Server error",
        data: {},
    });
});

module.exports = app;
