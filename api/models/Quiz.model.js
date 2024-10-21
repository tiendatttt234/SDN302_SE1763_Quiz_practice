const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    questions: [{
        questionFile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionFile',
            required: true
        },
        selectedQuestions: [{
            type: mongoose.Schema.Types.ObjectId, // Tham chiếu _id của từng câu hỏi từ arrayQuestion
            required: true
        }]
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
}, {
    timestamps: true
});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;
