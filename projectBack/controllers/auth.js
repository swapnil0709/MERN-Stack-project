const User = require("../models/user");
const { use } = require("../routes/auth");
const { body, validationResult, check } = require("express-validator");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Error saving data to DB",
      });
    }
    res.json({
      name: data.name,
      email: data.email,
      id: data._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //We are sure name and email are passing

  //finding the passed email in mongoDB
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }
    //Authenticating the password
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    //creating a token to send to the user
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.cookie("token", token, { expire: new Date() + 999 });

    //Destructuring some information to pass to frontend
    const { _id, name, email, role } = user;
    //Sending all the data
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "You signed out successfully",
  });
};

//protected Route - Here expressjwt already has next inside it hence we do not explicitly mention it

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//Custom Middlewares - next is imp

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id; //req.profile will come from frontend && req.auth is generated using jwt which contains _id of the user

  //In checker we are checking if profile and auth is there or not and if the id of the user signed in is equal t the auth id.

  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Access Denied You are not admin",
    });
  }
  next();
};
