const express = require("express");
const cors = require("cors");
const prisma = require("./config/db");
const routes = require("./routes/index");
const fs = require('fs');
const errorMiddleware = require("./middlewares/error.middleware");
require("./jobs/expireBookings");

const app = express();


if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(cors());

app.use("/api/v1/bookings/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.use("/api/v1", routes);

app.use(errorMiddleware);

module.exports = app;