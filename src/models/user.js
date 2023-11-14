const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const _ = require("lodash");
const mongoose = require("mongoose");
const validator = require("../middleware/joiValidator");

const taskSchema = new mongoose.Schema({
  tasks: [
    {
      topic: String, // e.g., "Video, Teoria, Ejercicios"
      resources: [String], // Array of resource URLs or names.
      status: String, // 'todo', 'inProgress', 'done', 'toReview'
    },
  ],
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean
  },
  github: {
    type: String,
    unique: true,
  },
  progress: {
    exercises: [taskSchema],
    theory: [taskSchema],
    videos: [taskSchema],
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    _.pick(this, ["_id", "userId", "email"]),
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model('User', userSchema);

const reqSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `El campo "nombre" es requerido` }),
  lastName: Joi.string()
    .required()
    .messages({ "any.required": `El campo "apellido" es requerido` }),
  email: Joi.string()
    .required()
    .email()
    .messages({ "any.required": `El campo "email" es requerido` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `El campo "contraseña" es requerido` }),
});

exports.User = User;
exports.validateBody = validator(reqSchema);
