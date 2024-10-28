const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Question content is required"],
        trim: true  
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
    }]
});


QuestionSchema.pre('validate', function (next) {
    if (this.type === 'Boolean' && this.answers.length !== 2) {
        next(new Error('Boolean questions must have exactly 2 answers.'));
    } else {
        next();
    }
});


const QuestionFileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of question bank is required"],
        trim: true  
    },
    description: {
        type: String,
        trim: true  
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
