const contacts = require("../models/contacts");
const { ctrlWrapper } = require("../helpers");
const { schema, updateFavoriteSchema } = require("../schemas/schemas");

const getAll = async (req, res) => {
  const data = await contacts.listContacts();

  res.status(200).json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await contacts.getContactById(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(data);
};

const addContact = async (req, res) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (typeof error !== "undefined") {
    res.status(400).json({ message: error.details[0].message });
  }

  const newContact = await contacts.addContact(value);

  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);

  if (!data) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (typeof error !== "undefined") {
    res.status(400).json({ message: error.details[0].message });
  }

  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing field" });
  }
  if (body) {
    const data = await contacts.updateContact(contactId, value);
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contact: data });
  }
};

const favoriteContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error, value } = updateFavoriteSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (typeof error !== "undefined") {
    res.status(400).json({ message: error.details[0].message });
  }

  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing field favorite" });
  }
  if (body) {
    const data = await contacts.updateStatusContact(contactId, value);
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contact: data });
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  favoriteContact: ctrlWrapper(favoriteContact),
};
