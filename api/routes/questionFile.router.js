const express = require('express');
const QuestionFileRouter = express.Router();
const QuestionFileController = require('../controllers/questionFile.controller');
const multer = require('multer');
const { uploadQuestions, listQuestions } = require('../controllers/uploadQuestion');
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1 * 1024 * 1024  // Giới hạn kích thước file là 1MB
    },
    fileFilter: (req, file, cb) => {
        // Kiểm tra loại file, chỉ chấp nhận file .txt
        if (file.mimetype !== 'text/plain') {
            return cb(new Error('Only .txt files are allowed!'), false);
        }
        cb(null, true);
    }
});// specify a directory for temporary file storage


QuestionFileRouter.post('/upload', upload.single('file'), uploadQuestions);
QuestionFileRouter.get('/list', listQuestions);
QuestionFileRouter.get('/getById/:id', QuestionFileController.getQuestionFileById);
QuestionFileRouter.get('/getAll', QuestionFileController.getAllQuestionFile);
QuestionFileRouter.post('/create', QuestionFileController.createQuestionFile);
QuestionFileRouter.put('/update/:id', QuestionFileController.updateQuestionFile);
QuestionFileRouter.delete('/delete/:id', QuestionFileController.deleteQuestionFile);
module.exports = QuestionFileRouter;