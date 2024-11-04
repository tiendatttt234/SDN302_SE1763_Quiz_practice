
const QuizRouter = require("./quiz.router");
const QuizSubmitRouter = require("./quizSubmit.router");
const questionUpload= require('./QuestionFileRouter')
const accountRouter= require('./account.routes')

module.exports = {
    QuizRouter,
    QuizSubmitRouter,
    questionUpload,
    accountRouter
}