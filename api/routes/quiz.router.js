const express = require('express');
const QuizRouter = express.Router();
const QuizController = require('../controllers/quiz.controller');

QuizRouter.get('/', QuizController.listAll);
QuizRouter.post('/create-quiz', QuizController.createQuiz);
QuizRouter.get('/getQuizById/:id', QuizController.getQuizById);

module.exports = QuizRouter;