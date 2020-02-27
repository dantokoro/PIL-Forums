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
      console.log('Session: ', req.session);

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

router.get("/profile", (req, res) => {
  // if (req.isAuthenticated()) console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  // else console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb');
  console.log('Session (profile): ', req.session);
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
  if (req.isAuthenticated()) return next();
  res.status(400).json({
    message: "access denied / not being login"
  });
}
