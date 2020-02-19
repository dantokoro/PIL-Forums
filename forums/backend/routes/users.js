const router = require("express").Router();
var crypto = require("crypto");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  let password = req.body.password;
  password = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  const newUser = new User({
    username: req.body.username,
    password: password,
    avatar_url: req.body.avatar_url,
    email: req.body.email
  });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.password = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest("hex");
      user.avatar_url = req.body.avatar_url;
      user.email = req.body.email;
      user.star = req.body.star;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
