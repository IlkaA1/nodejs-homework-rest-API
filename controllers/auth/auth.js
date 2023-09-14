const { schemaForAuth, schemaEmail } = require("../../schemas");
const { authFunktion } = require("../../models/users/index");
const { sendMail } = require("../../helpers/index");
const crypto = require("node:crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

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
    const verificationToken = crypto.randomUUID();
    const emailOptions = {
      to: email,
      subject: `Welcome!`,
      html: `
        <p>To confirm your registration, please click on link below</p>
        <p>
          <a href="http://localhost:3005/users/verify/${verificationToken}">Click me</a>
        </p>
      `,
      text: `
        To confirm your registration, please click on link below\n
        http://localhost:3005/users/verify/${verificationToken}
      `,
    };
    await sendMail(emailOptions);

    const newUser = await authFunktion.addUser({
      email,
      password: hashPassword,
      verificationToken,
    });

    res.status(201).json({ user: newUser });
  }
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const data = await authFunktion.filterVerification(verificationToken);
  if (!data) {
    res.status(404).json({ message: "User not found" });
  }

  const { _id } = data;

  await authFunktion.findAndUpdateverificationToken(_id);

  res.status(200).json({
    message: "Verification successful",
  });
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

    if (user.verify !== true) {
      return res.status(401).send({ message: "Please verify your email" });
    }

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

const additionalVerify = async (req, res) => {
  const { error, value } = schemaEmail.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (typeof error !== "undefined") {
    res.status(400).json({ message: "missing required field email" });
    return;
  }
  const { email } = value;
  const user = await authFunktion.userFind(email);

  if (user.verify === true) {
    res.status(400).json({ message: "Verification has already been passed" });
  }

  const emailOptions = {
    to: email,
    subject: `Welcome!`,
    html: `
        <p>To confirm your registration, please click on link below</p>
        <p>
          <a href="http://localhost:3005/users/verify/${user.verificationToken}">Click me</a>
        </p>
      `,
    text: `
        To confirm your registration, please click on link below\n
        http://localhost:3005/users/verify/${user.verificationToken}
      `,
  };
  await sendMail(emailOptions);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  current,
  subscription,
  verify,
  additionalVerify,
};
