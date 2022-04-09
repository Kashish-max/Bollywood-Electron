const express = require("express");
const passport = require("passport");
const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// const successLoginUrl = "http://localhost:3006/login/success";
const successLoginUrl = "http://localhost:3006/#/login/success";
// const errorLoginUrl = "http://localhost:3006/#/login/error";
const errorLoginUrl = "http://localhost:3006/#/login/error";


router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt : "select_account"
  })
);

router.get(
  "/autologin/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in!");
  }
);

router.get('/logout', function (req, res) {
  req.session = null;
  res.clearCookie("User");
  req.logout();
  res.redirect('http://localhost:3006/');
});

module.exports = router;
