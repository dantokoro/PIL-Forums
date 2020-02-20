const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
// var bodyParser = require("body-parser");
var session = require('express-session');

const usersRouter = require("./routes/users");
var authRoutes   = require('./routes/auth');
var testRoutes   = require('./routes/test');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

require('./config/passport')(passport);

app.use(morgan("dev")); // log tất cả request ra console log
app.use(cookieParser()); // đọc cookie (cần cho xác thực)
// app.use(bodyParser()); // lấy thông tin từ html forms
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "piluahihi",
    resave: false, //required
    saveUninitialized: false
  })
); // chuối bí mật đã mã hóa coookie
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/users", usersRouter);
app.use('/auth', authRoutes);
app.use('/test', testRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
