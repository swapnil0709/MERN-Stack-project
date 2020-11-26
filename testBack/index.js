const express = require("express");

const app = express();
const PORT = 3333;
app.get("/", (req, res) => {
  return res.send("Home page");
});

const login = (req, res) => {
  return res.send("You are logged in");
};

const isLoggedIn = (req, res, next) => {
  console.log("IsLoggedIn ran");
  next();
};

const isAdminUser = (req, res, next) => {
  console.log("ADMIN USER!!!!!!!!!!!");
  next();
};

app.get("/login", isLoggedIn, isAdminUser, login);

app.get("/logout", (req, res) => {
  return res.send("You are now logged out");
});

app.get("/hitesh", (req, res) => {
  return res.send("Hitest uses Instagram");
});

app.get("/app", (req, res) => {
  return res.send("We will finish the app soon");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
