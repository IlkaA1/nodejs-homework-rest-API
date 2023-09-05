const { ctrlWrapper } = require("../../helpers");

const {
  registerUser,
  loginUser,
  logout,
  current,
  subscription,
} = require("./auth");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
};
