const mongoose = require('mongoose');

// Schema cho việc lưu đáp án của người dùng
const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionFile.arrayQuestion', 
        required: true
    },
    selectedAnswer: [{
        type: String, 
        required: true
    }],
    isCorrect: {
        type: Boolean,
        required: true
    }
});

// Schema lưu kết quả làm bài quiz của người dùng
const QuizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    answers: [AnswerSchema], 
    correctAnswersCount: {
        type: Number,
        required: true
    },
    incorrectAnswersCount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const QuizResult = mongoose.model('QuizResult', QuizResultSchema);
module.exports = QuizResult;
