const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
} = require("../../routes/admin/validators");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }

    const { email, password, passwordConfirmation } = req.body;
    const newUser = await usersRepo.create({ email, password });

    req.session.userId = newUser.id;

    res.send(`ACCOUNT CREATED!! Your id is ${req.session.userId}`);
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const returningUser = await usersRepo.getOneBy({ email });
  console.log("RETURNING USER", returningUser);
  if (!returningUser) {
    return res.send("Hmmm... We don't have that email in our system.");
  }

  const validPassword = await usersRepo.comparePasswords(
    returningUser.password,
    password
  );

  if (!validPassword) {
    console.log(returningUser.password, password);
    return res.send("Password incorrect");
  }

  req.session.userId = returningUser.id;
  res.send("LOGGED IN!");
});

module.exports = router;
