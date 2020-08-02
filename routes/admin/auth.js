const express = require("express");
const usersRepo = require("../../repositories/users");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(`<div>
    <form method='POST'>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <input name="passwordConfirmation" type="password" />
      <button>Submit</button>  
    </form>
    </div>`);
});

router.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email already in use");
  }
  if (password !== passwordConfirmation) {
    return res.send("Passwords do not match");
  }

  const newUser = await usersRepo.create({ email, password });
  req.session.userId = newUser.id;

  res.send(`ACCOUNT CREATED!! Your id is ${req.session.userId}`);
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(`<div>
    <form method='POST'>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button>Sign in</button>  
    </form>
    </div>`);
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
