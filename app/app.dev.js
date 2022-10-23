const express = require("express");
const logger = require("morgan");

const apiRouter = require("./router");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(logger("dev"));
app.use("/api", apiRouter);
app.use("*", (req, res) => res.status(404).send("Error: File not found"));

module.exports = app;