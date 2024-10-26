const express = require('express');
const QuestionFileRouter = express.Router();
const QuestionFileController = require('../controllers/questionFile.controller');


QuestionFileRouter.get('/getById/:id', QuestionFileController.getQuestionFileById);
QuestionFileRouter.get('/getAll', QuestionFileController.getAllQuestionFile);
QuestionFileRouter.post('/create', QuestionFileController.createQuestionFile);

module.exports = QuestionFileRouter;