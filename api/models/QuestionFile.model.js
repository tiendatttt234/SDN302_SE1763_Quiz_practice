const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Question content is required"]
    },
    type: {
        type: String,
        enum: ['MCQ', 'MAQ', 'Boolean'],
        required: [true, "Question type is required"]
    },
    answers: [{
        answerContent: {
            type: String,
            trim: true,
            required: [true, "Answer content is required"]
        },
        isCorrect: { 
            type: Boolean,
            required: true
        }
    }],
    // explanation: String // Nếu không dùng thì xóa hẳn, hoặc thêm nếu cần

});

const QuestionFileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of question bank is required"]
    },
    description: {
        type: String
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    arrayQuestion: [QuestionSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Creator of question bank is required"]
    }
}, {
    timestamps: true
});

const QuestionFile = mongoose.model("QuestionFile", QuestionFileSchema);
module.exports = QuestionFile;
