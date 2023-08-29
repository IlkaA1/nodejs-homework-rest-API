const { contactsFunktion } = require("../../models");

const getAll = async (req, res) => {
  const data = await contactsFunktion.listContacts();

  res.status(200).json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactsFunktion.getContactById(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(data);
};

module.exports = { getAll, getContactById };
