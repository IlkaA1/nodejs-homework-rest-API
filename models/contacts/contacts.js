const Contact = require("./contact");

const listContacts = async (owner, page = 1, limit, favorite) => {
  const data = await Contact.find(owner).exec();

  if (data.length < limit) {
    return data;
  }

  if (favorite) {
    const data = await Contact.find(owner).find({ favorite }).exec();
    return data;
  }

  const pagination = await Contact.find(owner)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return pagination;
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
