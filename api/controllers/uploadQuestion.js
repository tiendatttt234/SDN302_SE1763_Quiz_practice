const fs = require('fs');
const path = require('path');
const QuestionFile = require('../models/QuestionFile.model');
const httpError = require('http-errors');

const uploadQuestions = async (req, res, next) => {
    try {
        console.log("Received file upload request...");

        // Normalize file path for cross-platform compatibility
        const filePath = path.normalize(req.file.path);
        console.log("File path:", filePath);

        // Attempt to read the file content
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        console.log("File content read successfully:", fileContent);

        // Parse the file content
        const questions = [];
        const lines = fileContent.split('\n');
        let currentQuestion = null;

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('Q:')) {
                // Start a new question
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    content: line.substring(2).trim(),
                    type: 'MCQ', // Default to MCQ; adjust based on format or input as needed
                    answers: []
                };
            } else if (line.startsWith('A:')) {
                // Add an answer to the current question
                const isCorrect = line.endsWith('(correct)');
                currentQuestion.answers.push({
                    answerContent: line.replace('(correct)', '').substring(2).trim(),
                    isCorrect
                });
            }
        });

        // Push the last question if available
        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        console.log("Parsed questions:", questions);

        // Validate if questions are parsed
        if (questions.length === 0) {
            throw new Error("No questions parsed from the file");
        }

        // Prepare data for saving to the database
        const questionFile = new QuestionFile({
            name: req.body.name || 'Uploaded Question Bank',
            description: req.body.description || '',
            createdBy: null, // Ensure createdBy exists
            arrayQuestion: questions
        });

        console.log("Prepared question file data for database:", questionFile);

        // Attempt to save the parsed questions to the database
        await questionFile.save();
        console.log("Saved question file successfully:", questionFile);

        res.json({ message: 'Questions uploaded and saved successfully', questionFile });

        // Clean up the uploaded file
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error("Detailed error during file processing:", error.message);
        next(httpError(500, 'Failed to process the uploaded file'));
    }
};

const listQuestions = async (req, res, next) => {
    try {
        // Lấy danh sách tất cả QuestionFile từ cơ sở dữ liệu
        const questionFiles = await QuestionFile.find().populate('createdBy', 'username email'); // Nếu bạn muốn lấy thông tin của người tạo
        
        res.json({ message: 'List of question files', questionFiles });
    } catch (error) {
        console.error("Error fetching question files:", error.message);
        next(httpError(500, 'Failed to fetch question files'));
    }
};

module.exports = { uploadQuestions, listQuestions };
