const { ctrlWrapper } = require("../../helpers");

const {
  registerUser,
  loginUser,
  logout,
  current,
  subscription,
  avatars,
} = require("./auth");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
  avatars: ctrlWrapper(avatars),
};
