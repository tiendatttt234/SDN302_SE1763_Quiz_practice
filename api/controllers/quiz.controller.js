const Quiz = require('../models/Quiz.model');

async function listAll(req,res,next) {
    const listQuiz = await Quiz.find();

    return res.status(200).json({listQuiz});
}

async function createQuiz(req,res,next) {
    const { quizName, questionCount, userId } = req.body;

    console.log(quizName + " " + questionCount + " " + userId);
    
}
const QuizController = {
    listAll,
    createQuiz,
}

module.exports = QuizController;