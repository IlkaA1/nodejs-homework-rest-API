const Contact = require("./contact");

const listContacts = async () => {
  const data = await Contact.find({});
  console.log(data);
  return data;
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
