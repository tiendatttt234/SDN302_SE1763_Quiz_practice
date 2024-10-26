const mongoose = require('mongoose');


const AnswerSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true
    }, 
    selectedAnswerId: [{
        type: String
    }], 
    isCorrect: {
        type: Boolean,
        required: true
    } 
});

const QuizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    questionFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionFile',
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    userAnswers: [AnswerSchema],
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
