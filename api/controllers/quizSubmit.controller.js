const QuizResult = require('../models/QuizResult.model');
const QuestionFile = require('../models/QuestionFile.model');
const mongoose = require('mongoose');
async function getQuiz(req,res,next) {
    // const getAll = await QuizResult.find({});
     res.status(200).json({message: "hehe"});
}

async function submitQuiz(req, res, next) {
    try {
        const { userId, quizId, questionFileId, userAnswers } = req.body;
        

        //Check if quizId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz' });
        }

        //Get QuestionFile to check correct answers
        const questionFile = await QuestionFile.findById(questionFileId);
        if (!questionFile) {
            return res.status(404).json({ message: "Question file not found" });
        }

        let correctAnswersCount = 0;
        let incorrectAnswersCount = 0;

        const evaluatedAnswers = userAnswers.map(userAnswer => {
            const question = questionFile.arrayQuestion.find(file => file._id.toString() === userAnswer.questionId);
            console.log(question);
            
            const isCorrect = isAnswerCorrect(question, userAnswer);
            isCorrect ? correctAnswersCount++ : incorrectAnswersCount++;

            return { ...userAnswer, isCorrect };
        });

        // Create a new QuizResult instance
        const newQuizResult = new QuizResult({
            user: userId,
            quiz: quizId,
            questionFile: questionFileId,
            userAnswers: evaluatedAnswers,
            correctAnswersCount,
            incorrectAnswersCount,
        });

        // Save the result and return response
        await newQuizResult.save();
        res.status(200).json({ newQuizResult });
    } catch (error) {
        next(error);
    }
}

function isAnswerCorrect(question, userAnswer) {
    if (question.type === "MAQ") {
        // Check if both sets (user-selected and correct answers) match
        const correctAnswerIds = question.answers.filter(a => a.isCorrect).map(a => a._id.toString());
        return (
            userAnswer.selectedAnswerId.length === correctAnswerIds.length &&
            userAnswer.selectedAnswerId.every(id => correctAnswerIds.includes(id))
        );
    } else {
        // For single-answer questions, check if selected answer matches correct answer
        const correctAnswerId = question.answers.find(a => a.isCorrect)?._id.toString();
        return userAnswer.selectedAnswerId[0] === correctAnswerId;
    }
}
const QuizSubmitController = {
    getQuiz,
    submitQuiz
};
module.exports = QuizSubmitController;
