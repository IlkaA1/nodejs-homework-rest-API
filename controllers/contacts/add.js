const { contactsFunktion } = require("../../models");
const { schema } = require("../../schemas");

const addContact = async (req, res) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (typeof error !== "undefined") {
    res.status(400).json({ message: error.details[0].message });
  }

  const newContact = await contactsFunktion.addContact(value);

  res.status(201).json(newContact);
};

module.exports = addContact;
