const express = require('express');
const { json } = require("body-parser");
const QuestionFileRouter = express.Router();
const QuestionFileController = require('../controllers/questionFile.controller');
const multer = require('multer');
const { uploadQuestions, listQuestions } = require('../controllers/uploadQuestion');

QuestionFileRouter.use(json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } 
}).any(); 
const fs = require('fs');
const path = require('path');

QuestionFileRouter.post('/upload', (req, res, next) => {
    
    const file = req.files.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log("Received file:", file);
    const filePath = path.join(__dirname, "..",'uploads', Date.now() + '-' + file.name);
    fs.writeFile(filePath, file.data, (err) => {
        if (err) {
            console.error("Error saving file:", err.message);
            return res.status(500).json({ error: 'Failed to save file' });
        }
        console.log("File saved successfully at:", filePath);
        req.filePath = filePath;
        next();
    });
}, uploadQuestions);




QuestionFileRouter.get('/list', listQuestions);
QuestionFileRouter.get('/getById/:id', QuestionFileController.getQuestionFileById);
QuestionFileRouter.get('/getByIdandUserId/:id', QuestionFileController.getQuestionFileByIdandUserID);
QuestionFileRouter.get('/getAll', QuestionFileController.getAllQuestionFile);
QuestionFileRouter.post('/create', QuestionFileController.createQuestionFile)
QuestionFileRouter.put('/update/:id', QuestionFileController.updateQuestionFile);
QuestionFileRouter.delete('/delete/:id', QuestionFileController.deleteQuestionFile);
module.exports = QuestionFileRouter;
