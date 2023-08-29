const { ctrlWrapper } = require("../../helpers");

const addContact = require("./add");
const { getAll, getContactById } = require("./get");
const removeContact = require("./remove");
const { favoriteContact, updateContact } = require("./update");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  favoriteContact: ctrlWrapper(favoriteContact),
};
