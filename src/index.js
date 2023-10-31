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

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server up, port: ${port}`));
