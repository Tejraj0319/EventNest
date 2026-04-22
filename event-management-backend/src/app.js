const express = require("express");
const cors = require("cors");
const prisma = require("./config/db");
const routes = require("./routes/index");
require("./jobs/expireBookings");

const app = express();

app.use(cors());

app.use("/api/v1/bookings/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.use("/api/v1", routes);

module.exports = app;