"use strict";

/** Express app for PAM backend */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/authentication");
const authenticationRoutes = require("./routes/authenticate");
const userRoutes = require("./routes/users")
const dailyRoutes = require("./routes/dailies");
const eventRoutes = require("./routes/events");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//middleware

app.use(authenticateJWT);

//routes

app.use("/", authenticationRoutes);
app.use("/users",userRoutes);
app.use("/dailies", dailyRoutes);
app.use("/events", eventRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
