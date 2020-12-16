const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { body, validationResult, check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Please give the length of at least 3 characters"),
    check("email").isEmail().withMessage("Please enter a valid email adddress"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a length of at least 5"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Valid Email Address is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a password with atleast 5 characters"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.send("TEST SUCCESS!!");
});

module.exports = router;
