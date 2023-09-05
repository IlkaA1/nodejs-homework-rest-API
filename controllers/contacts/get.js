const { contactsFunktion } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { page, limit, favorite } = req.query;

  const data = await contactsFunktion.listContacts(
    { owner: req.user.id },
    page,
    limit,
    favorite
  );

  res.status(200).json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactsFunktion.getContactById(contactId).exec();
  if (!data) {
    res.status(404).json({ message: "Not found" });
  }
  if (data.owner.toString !== req.user.id) {
    return res.status(404).send({ message: "Book not found" });
  }

  res.status(200).json(data);
};

module.exports = { getAll, getContactById };
