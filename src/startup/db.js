const config = require("config");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(config.get("db"))
    .then(() => console.log("Tenemos conexión con la db..."))
    .catch((err) => console.log("ERROR FATAL: ", err));
};
