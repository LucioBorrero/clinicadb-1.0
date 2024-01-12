// /server/validation.js

const Joi = require('joi');

const schema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  edad: Joi.number().integer().required(),
});

function validarDatosPaciente(datos) {
  return schema.validate(datos);
}

module.exports = { validarDatosPaciente };
