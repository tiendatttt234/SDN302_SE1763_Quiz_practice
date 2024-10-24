const express = require('express');
const QuizRouter = express.Router();
const QuizController = require('../controllers/quiz.controller');

QuizRouter.get('/', QuizController.listAll);
QuizRouter.post('/create-quiz', QuizController.createQuiz);

module.exports = QuizRouter;