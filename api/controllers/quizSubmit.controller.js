const QuizResult = require('../models/QuizResult.model');
const QuestionFile = require('../models/QuestionFile.model');

async function getQuiz(req,res,next) {
    // const getAll = await QuizResult.find({});
     res.status(200).json({message: "hehe"});
}

async function submitQuiz(req, res, next) {
    try {
        const { userId, quizId, questionFileId, userAnswers } = req.body;
        
        // Retrieve the QuestionFile to check correct answers
        const questionFile = await QuestionFile.findById(questionFileId);
        if (!questionFile) {
            return res.status(404).json({ message: "Question file not found" });
        }

        let correctAnswersCount = 0;
        let incorrectAnswersCount = 0;

        // Map userAnswers to determine correctness
        const evaluatedAnswers = userAnswers.map(userAnswer => {
            const question = questionFile.arrayQuestion.find(q => q._id.toString() === userAnswer.questionId);
            if (!question) {
                return { ...userAnswer, isCorrect: false };
            }

            const isCorrect =
                question.type === "MAQ"
                    ? userAnswer.selectedAnswerId.length === question.answers.filter(a => a.isCorrect).length &&
                      userAnswer.selectedAnswerId.every(answerId =>
                          question.answers.some(a => a.isCorrect && a._id.toString() === answerId)
                      )
                    : userAnswer.selectedAnswerId[0] === question.answers.find(a => a.isCorrect)._id.toString();

            if (isCorrect) correctAnswersCount++;
            else incorrectAnswersCount++;

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

const QuizSubmitController = {
    getQuiz,
    submitQuiz
};
module.exports = QuizSubmitController;
