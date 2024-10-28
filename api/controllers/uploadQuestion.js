// controllers/uploadQuestion.controller.js
const fs = require('fs');
const path = require('path');
const QuestionFile = require('../models/QuestionFile.model');
const httpError = require('http-errors');

// Xử lý upload file câu hỏi
const uploadQuestions = async (req, res, next) => {
    try {
        

        // Kiểm tra nếu file không tồn tại
        if (!req.file) {
            throw new Error("File is required and must be a .txt file.");
        }

        // Chuẩn hóa đường dẫn để tương thích đa nền tảng
        const filePath = path.normalize(req.file.path);
       

        // Đọc nội dung file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        

        // Phân tích nội dung file thành danh sách câu hỏi
        const questions = [];
        const lines = fileContent.split('\n');
        let currentQuestion = null;

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('Q:')) {
                // Bắt đầu một câu hỏi mới
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    content: line.substring(2).trim(),
                    type: 'MCQ', // Mặc định là MCQ; có thể điều chỉnh nếu cần
                    answers: []
                };
            } else if (line.startsWith('A:')) {
                // Thêm một đáp án vào câu hỏi hiện tại
                const isCorrect = line.endsWith('(correct)');
                currentQuestion.answers.push({
                    answerContent: line.replace('(correct)', '').substring(2).trim(),
                    isCorrect
                });
            }
        });

        // Thêm câu hỏi cuối cùng vào danh sách nếu có
        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        

        // Kiểm tra nếu không có câu hỏi nào được phân tích
        if (questions.length === 0) {
            throw new Error("No questions parsed from the file");
        }

        // Chuẩn bị dữ liệu để lưu vào cơ sở dữ liệu
        const questionFile = new QuestionFile({
            name: req.body.name || 'Uploaded Question Bank',
            description: req.body.description || '',
            createdBy: null, // Đặt là null hoặc thông tin người tạo nếu có
            arrayQuestion: questions
        });

        console.log("Prepared question file data for database:", questionFile);

        // Lưu câu hỏi đã phân tích vào cơ sở dữ liệu
        await questionFile.save();
       

        res.json({ message: 'Questions uploaded and saved successfully', questionFile });

        // Xóa file đã tải lên sau khi xử lý xong
        fs.unlinkSync(filePath);
    } catch (error) {
        
        // Xử lý lỗi chi tiết
        if (error.message === "File is required and must be a .txt file.") {
            next(httpError(400, error.message));
        } else if (error.message === "No questions parsed from the file") {
            next(httpError(400, error.message));
        } else {
            next(httpError(500, 'Failed to process the uploaded file'));
        }
    }
};

// Lấy danh sách câu hỏi
const listQuestions = async (req, res, next) => {
    try {
        // Lấy danh sách tất cả QuestionFile từ cơ sở dữ liệu và bao gồm thông tin người tạo
        const questionFiles = await QuestionFile.find().populate('createdBy', 'username email');
        
        res.json({ message: 'List of question files', questionFiles });
    } catch (error) {
        
        next(httpError(500, 'Failed to fetch question files'));
    }
}; 

module.exports = { uploadQuestions, listQuestions };
