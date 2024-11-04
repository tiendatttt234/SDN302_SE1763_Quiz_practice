
const fs = require('fs');
const path = require('path');
const QuestionFile = require('../models/QuestionFile.model');
const httpError = require('http-errors');

const uploadQuestions = async (req, res, next) => {
    try {
        console.log("Received file upload request...");

        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const filePath = path.normalize(req.file.path);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const questions = [];
        const lines = fileContent.split('\n');
        let currentQuestion = null;

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('Q:')) {
                if (currentQuestion) questions.push(currentQuestion);
                currentQuestion = {
                    content: line.substring(2).trim(),
                    type: 'MCQ',
                    answers: []
                };
            } else if (line.startsWith('A:')) {
                const isCorrect = line.endsWith('(correct)');
                currentQuestion.answers.push({
                    answerContent: line.replace('(correct)', '').substring(2).trim(),
                    isCorrect
                });
            }
        });

     
        if (currentQuestion) questions.push(currentQuestion);

        
        if (questions.length === 0) {
            throw new Error("No questions parsed from the file");
        }

        // Tạo mới QuestionFile trong MongoDB
        const questionFile = new QuestionFile({
            name: req.body.name || 'Uploaded Question Bank',
            description: req.body.description || '',
            createdBy: req.body.createdBy || null,
            arrayQuestion: questions
        });

        await questionFile.save();
        console.log("Saved question file successfully:", questionFile);

        res.json({ message: 'Questions uploaded and saved successfully', questionFile });

        // Xóa file tạm sau khi lưu thành công
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error("Error during file processing:", error.message);

     
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        
        next(httpError(500, 'Failed to process the uploaded file'));
    }
};

const listQuestions = async (req, res, next) => {
    try {
        const questionFiles = await QuestionFile.find().populate('createdBy', 'username email');
        res.json({ message: 'List of question files', questionFiles });
    } catch (error) {
        console.error("Error fetching question files:", error.message);
        next(httpError(500, 'Failed to fetch question files'));
    }
};

module.exports = { uploadQuestions, listQuestions };
