const User = require("./user");

const userFind = (email) => {
  const user = User.findOne({ email }).exec();
  return user;
};

const addUser = (body) => {
  const { email, password, verificationToken } = body;
  return User.create({ email, password, verificationToken });
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

const filterVerification = async (verificationToken) => {
  const data = await User.findOne({ verificationToken }).exec();
  return data;
};

const findAndUpdateverificationToken = async (_id) => {
  const data = await User.findByIdAndUpdate(
    _id,
    {
      verificationToken: null,
      verify: true,
    },
    { new: true }
  ).exec();
  return data;
};

module.exports = {
  addUser,
  userFind,
  findById,
  findAndUpdate,
  findAndUpdateSubscription,
  filterVerification,
  findAndUpdateverificationToken,
};
