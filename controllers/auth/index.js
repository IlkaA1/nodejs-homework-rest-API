const { ctrlWrapper } = require("../../helpers");

const {
  registerUser,
  loginUser,
  logout,
  current,
  subscription,
  verify,
  additionalVerify,
} = require("./auth");

module.exports = {
  additionalVerify: ctrlWrapper(additionalVerify),
  verify: ctrlWrapper(verify),
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
};
