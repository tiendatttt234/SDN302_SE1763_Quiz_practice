const httpError = require("http-errors");
const express = require("express");
const { json } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./models");
const path = require("path");
const fileUpload = require("express-fileupload");
const {
  QuizRouter,
  QuestionFileRouter,
  QuizSubmitRouter,
  AccountRouter,
} = require("./routes");
const BlogRouter = require("./routes/blog.router");

// const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/public", express.static(path.join(__dirname, "public")));
//app use các router ở đây
//app.use("Router");

app.use("/quiz", QuizRouter);
app.use("/quizSubmit", QuizSubmitRouter);
app.use("/account", AccountRouter);
app.use("/questionFile", QuestionFileRouter);
app.use("/quizSubmit", QuizSubmitRouter);
app.use("/blog", BlogRouter);

//kiem soat cac loi khi xu ly tren router, controller va model
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(process.env.PORT, process.env.HOST_NAME, async () => {
  console.log(
    `Server starting at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
  await db.connectDB();
});
