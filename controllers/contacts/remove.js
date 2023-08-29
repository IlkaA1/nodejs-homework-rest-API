const { contactsFunktion } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsFunktion.removeContact(contactId);

  if (!data) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
