const httpError = require('http-errors');
const express = require('express');
const { json } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');
const { QuizRouter, QuestionFileRouter, QuizSubmitRouter,  } = require('./routes');

// const cors = require('cors')
require('dotenv').config();


const app = express();
app.use(morgan("dev"));
app.use(json());
app.use(cors());


//app use các router ở đây
//app.use("Router");

app.use('/quiz', QuizRouter);
app.use('/questionFile', QuestionFileRouter );
app.use('/quizSubmit', QuizSubmitRouter);

//kiem soat cac loi khi xu ly tren router, controller va model
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    })
  });

app.listen(process.env.PORT,process.env.HOST_NAME, async() => {
    console.log(`Server starting at http://${process.env.HOST_NAME}:${process.env.PORT}`);
    await db.connectDB();
  })
