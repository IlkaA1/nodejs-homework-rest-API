const { schemaForAuth } = require("../../schemas");
const { authFunktion } = require("../../models/users/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
console.log(avatarsDir);

const registerUser = async (req, res) => {
  const { error, value } = schemaForAuth.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (typeof error !== "undefined") {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  if (value) {
    const { email, password } = req.body;
    const user = await authFunktion.userFind(email);

    if (user) {
      res.status(409).json({
        message: "Email in use",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await authFunktion.addUser({
      email,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({ user: newUser });
  }
};

const loginUser = async (req, res) => {
  const { error, value } = schemaForAuth.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (typeof error !== "undefined") {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  if (value) {
    const { email, password } = req.body;
    const user = await authFunktion.userFind(email);

    if (user === null) {
      console.log("emai");
      res.status(401).json({ message: "Email or password is wrong" });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      console.log("pass");
      res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    if (token) {
      authFunktion.findAndUpdate(user._id, token);
    }

    res.status(200).json({
      token,
      user: {
        email,
        subscription: "starter",
      },
    });
  }
};

const logout = async (req, res) => {
  const { id } = req.user;
  const token = null;
  await authFunktion.findAndUpdate(id, token);

  res.status(204).json();
};

const current = async (req, res) => {
  const { id } = req.user;
  const { email, subscription } = await authFunktion.findById(id);

  res.status(200).json({
    email,
    subscription,
  });
};

const subscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const data = await authFunktion.findAndUpdateSubscription(id, subscription);
  res.status(200).json({ user: data });
};

const avatars = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${id}_${originalname}`;
  const fileName = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, fileName);
  const avatarURL = path.join("avatars", filename);
  await authFunktion.findAndUpdateAvatar(id, avatarURL);

  res.status(200).json({ avatarURL });
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  current,
  subscription,
  avatars,
};
