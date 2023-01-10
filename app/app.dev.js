const express = require("express");
const logger = require("morgan");
const { join } = require("path");


const apiRouter = require("./router");

const app = express();

//config templates engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(logger("dev"));

// static files
app.use(express.static(join(__dirname, "..", "public")));

// endpoints
app.use("/api", apiRouter);
app.use("*", (req, res) => res.status(404).send("Error: File not found"));


module.exports = app;