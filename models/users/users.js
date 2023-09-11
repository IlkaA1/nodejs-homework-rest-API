const User = require("./user");

const userFind = (email) => {
  const user = User.findOne({ email }).exec();
  return user;
};

const addUser = (body) => {
  const { email, password, avatarURL } = body;
  return User.create({ email, password, avatarURL });
};

const findById = (id) => {
  return User.findById(id).exec();
};

const findAndUpdate = async (id, token) => {
  const data = await User.findByIdAndUpdate(id, { token }).exec();
  return data;
};

const findAndUpdateSubscription = async (id, subscription) => {
  const data = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  ).exec();
  return data;
};

const findAndUpdateAvatar = async (id, avatarURL) => {
  const data = await User.findByIdAndUpdate(id, avatarURL, {
    new: true,
  }).exec();
  return data;
};

module.exports = {
  addUser,
  userFind,
  findById,
  findAndUpdate,
  findAndUpdateSubscription,
  findAndUpdateAvatar,
};
