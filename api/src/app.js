const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieSession = require("cookie-session");

require("./auth/passport");
require("./auth/passportGoogleSSO");

require("./models/user");

const User = require("./models/user");

const middlewares = require("./middlewares");
const api = require("./api");
const passport = require("passport");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3006", credentials: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.post("/api/rankList", async (req, res) => {
    const UserList = await User.findAll().catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });

    if (UserList) {
      res.status(200).send({
        Players: UserList,
      });      
    }
})

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
