const Quiz = require('../models/Quiz.model');
const QuestionFile = require('../models/QuestionFile.model');
const mongoose = require('mongoose');
async function listAll(req,res,next) {
    const listQuiz = await Quiz.find();

    return res.status(200).json({listQuiz});
}


async function createQuiz(req, res, next) {
    const { quizName, userId, questionFileId, questionCount } = req.body;
    console.log(req.body);
    
    try {
        // Validate that userId and questionFileId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(questionFileId)) {
            return res.status(400).json({ message: "Invalid userId or questionFileId" });
        }

        // Fetch the QuestionFile by its ID
        const questionFile = await QuestionFile.findById(questionFileId);

        if (!questionFile) {
            return res.status(404).json({ message: "Question file not found" });
        }


        if(questionCount > questionFile.arrayQuestion.length) {
            return res.status(400).json({ message: "Question count exceeds the number of questions in the question file" });    
        }
        // kiểm tra questionFile có tồn tại không
        // console.log(questionFile);
        
        // Extract question IDs from the questionFile
        const allQuestions = questionFile.arrayQuestion.map(q => q._id);
        // map lấy toàn bộ questionId trong questionFile để tiến hành lấy random question theo _id
        // console.log(allQuestions);
        
        // Shuffle the array and select random questions
        const getRandomQuestions = (questions, count) => {
            const selected = new Set();
            while(selected.size < count) {
                const randomIndex = Math.floor(Math.random() * questions.length);
                selected.add(questions[randomIndex]);
            }
            return Array.from(selected);
        };
        
        const randomListQuestions = getRandomQuestions(allQuestions, questionCount);
        // console.log(randomListQuestions);
        
        // Create a new Quiz object
        const newQuiz = new Quiz({
            quizName,
            duration: 30, // Set a default or dynamic value
            questionFile: questionFileId,
            selectedQuestions:randomListQuestions,
            createdBy: userId
        });

        // Save the quiz to the database
        await newQuiz.save();

        // Return a success response
        return res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });

    } catch (error) {
        next(error);
    }
}
// create Quiz chưa tính trường hợp số lượng câu hỏi lớn hơn tệp questionFile


async function getQuizById(req, res, next) {
    try {
        const { id } = req.params;

        // Find the quiz by ID and populate the questionFile, including questionFileId
        const quiz = await Quiz.findById(id)
            .populate({
                path: 'questionFile',
                select: '_id name arrayQuestion', // Ensure _id (questionFileId), name, and arrayQuestion are included
            })
            .lean();

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (!quiz.questionFile || !quiz.questionFile.arrayQuestion) {
            return res.status(404).json({ message: "Question file or questions not found" });
        }

        const selectedQuestions = quiz.selectedQuestions.map(questionId => {
            const question = quiz.questionFile.arrayQuestion.find(q => q && q._id.equals(questionId));
            if (!question) {
                console.log('Question not found for questionId:', questionId);
                return null;
            }
            return {
                questionFileId: quiz.questionFile._id, // Include questionFileId
                questId: question._id,
                content: question.content,
                type: question.type,
                answers: question.answers.map(answer => ({
                    answerId: answer._id,
                    text: answer.answerContent
                }))
            };
        }).filter(Boolean);

        const quizData = {
            id: quiz._id,
            name: quiz.quizName,
            duration: quiz.duration,
            questionFileId: quiz.questionFile._id, // Include questionFileId at the top level
            questionFileName: quiz.questionFile.name,
            questions: selectedQuestions
        };

        res.status(200).json(quizData);
    } catch (error) {
        next(error);
    }
}

const QuizController = {
    listAll,
    createQuiz,
    getQuizById
}

module.exports = QuizController;