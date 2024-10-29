const express = require('express');
const QuizSubmitRouter = express.Router();
const QuizSubmitController = require('../controllers/quizSubmit.controller')

QuizSubmitRouter.post('/getAllByUserId', QuizSubmitController.getAllQuizResultByUserId);
QuizSubmitRouter.post('/submit', QuizSubmitController.submitQuiz);

module.exports = QuizSubmitRouter;