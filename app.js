const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const AppError = require("./AppError");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());
// app.use(express.json());

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use("/api/users", userRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Something went wrong" : message,
  });
});

module.exports = app;
