const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<div>
  <form method='POST'>
    <input name="email" type="email" />
    <input name="password" type="password" />
    <input name="passwordConfirmation" type="password" />
    <button>Submit</button>  
  </form>
  </div>`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("ACCOUNT CREATED!!");
});

app.listen(3001, () => {
  console.log("listening!");
});
