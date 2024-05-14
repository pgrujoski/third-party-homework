const { Validator } = require("node-input-validator");

const SendGridFields = {
    to: "required|string",
    message: "required|object",
}

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if (!e){
        throw v.errors;
    }
};

module.exports = {
    SendGridFields,
    validate
}

