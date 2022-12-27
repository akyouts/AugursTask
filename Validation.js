const Joi = require("joi");

const schema = Joi.object({
    Password: Joi.string()
        .alphanum()
        .min(8)
        .required(),


    Email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } })
})

module.exports = schema;