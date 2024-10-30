const express = require('express');
const QuestionFileRouter = express.Router();
const QuestionFileController = require('../controllers/questionFile.controller');
const multer = require('multer');
const { uploadQuestions, listQuestions } = require('../controllers/uploadQuestion');


const upload = multer({ dest: 'uploads/' }); 


QuestionFileRouter.post('/upload', upload.single('file'), uploadQuestions);
QuestionFileRouter.get('/list', listQuestions);
QuestionFileRouter.get('/getById/:id', QuestionFileController.getQuestionFileById);
QuestionFileRouter.get('/getAll', QuestionFileController.getAllQuestionFile);
QuestionFileRouter.post('/create', QuestionFileController.createQuestionFile);
QuestionFileRouter.put('/update/:id', QuestionFileController.updateQuestionFile);
QuestionFileRouter.delete('/delete/:id', QuestionFileController.deleteQuestionFile);
QuestionFileRouter.patch('/togglePrivacy/:id',QuestionFileController.togglePrivacy);
module.exports = QuestionFileRouter;