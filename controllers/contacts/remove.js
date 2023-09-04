const { contactsFunktion } = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsFunktion.removeContact(contactId);

  if (!data) {
    res.status(404).json({ message: "Not found" });
  }

  if (data.owner.toString() !== req.user.id) {
    return res.status(404).send({ message: "Book not found" });
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
