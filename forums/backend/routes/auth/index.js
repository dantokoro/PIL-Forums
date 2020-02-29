var express = require("express");
var router = express.Router();
var passport = require("passport");

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/auth/profile",
    failureRedirect: "/"
  })
);

// router.post(
//   "/login",
//   function(req, res, next) {
//     console.log("routes/user.js, login, req.body: ");
//     console.log(req.body);
//     next();
//   },
//   passport.authenticate("local-login", {
//     successRedirect: "/auth/profile",
//     failureRedirect: "/"
//   })
// );

router.post(
  '/login',
  function (req, res, next) {
      console.log('routes/user.js, login, req.body: ');
      console.log(req.body)
      next()
  },
  passport.authenticate('local-login'),
  (req, res) => {
      console.log('logged in', req.user.username);
      res.send(req.user);
  }
)

router.get('/', (req, res, next) => {
  console.log("Current user: " + req.user);
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

router.get("/profile", isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});


router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.status(200).json({
    message: "successfully logout"
  });
});

module.exports = router;

//route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  console.log('Session (islogin): ', req.session);
  if (req.isAuthenticated()) return next();
  res.status(400).json({
    message: "access denied / not being login"
  });
}
