const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
require("./startup/db")();

const helmet = require("helmet");

const registro = require("./routes/registro");
const login = require("./routes/auth");
const user = require("./routes/user")
const ping = require("./routes/ping");

app.use("/ping", ping);
app.use("/login", login);
app.use("/registro", registro);
app.use("/user", user);

app.listen(5000, () =>
  console.log("Reptiliano afroamericano")
);
