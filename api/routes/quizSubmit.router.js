const express = require('express');
const QuizSubmitRouter = express.Router();
const QuizSubmitController = require('../controllers/quizSubmit.controller')

QuizSubmitRouter.get('/get', QuizSubmitController.getQuiz);
QuizSubmitRouter.post('/submit', QuizSubmitController.submitQuiz);

module.exports = QuizSubmitRouter;