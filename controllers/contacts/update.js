const { contactsFunktion } = require("../../models/contacts");
const { schema, updateFavoriteSchema } = require("../../schemas");

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
    const data = await contactsFunktion.updateContact(contactId, value);

    if (data.owner.toString() !== req.user.id) {
      return res.status(404).send({ message: "Book not found" });
    }
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
    const data = await contactsFunktion.updateStatusContact(contactId, value);
    if (data.owner.toString() !== req.user.id) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contact: data });
  }
};

module.exports = {
  favoriteContact,
  updateContact,
};
