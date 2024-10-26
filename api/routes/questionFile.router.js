const express = require('express');
const QuestionFileRouter = express.Router();
const QuestionFileController = require('../controllers/questionFile.controller');


QuestionFileRouter.get('/getById/:id', QuestionFileController.getQuestionFileById);
QuestionFileRouter.get('/getAll', QuestionFileController.getAllQuestionFile);
QuestionFileRouter.post('/create', QuestionFileController.createQuestionFile);
QuestionFileRouter.put('/update/:id', QuestionFileController.updateQuestionFile);
QuestionFileRouter.delete('/delete/:id', QuestionFileController.deleteQuestionFile);
module.exports = QuestionFileRouter;