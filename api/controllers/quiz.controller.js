const Quiz = require('../models/Quiz.model');
const QuestionFile = require('../models/QuestionFile.model');
const mongoose = require('mongoose');
async function listAll(req,res,next) {
    const listQuiz = await Quiz.find();

    return res.status(200).json({listQuiz});
}


async function createQuiz(req, res, next) {
    const { quizName, userId, questionFileId, questionCount } = req.body;
    
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
        console.log(questionFile);
        
        // Extract question IDs from the questionFile
        const allQuestions = questionFile.arrayQuestion.map(q => q._id);
        console.log(allQuestions);
        
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
        console.log(randomListQuestions);
        
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

        // Lấy quiz theo ID và populate questionFile
        const quiz = await Quiz.findById(id)
            .populate({
                path: 'questionFile',
                select: 'name arrayQuestion',
            })
            .lean(); // Thêm lean() để nhận kết quả đầy đủ
        console.log(quiz);
        
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (!quiz.questionFile || !quiz.questionFile.arrayQuestion) {
            return res.status(404).json({ message: "Question file or questions not found" });
        }

        console.log(quiz.questionFile.arrayQuestion);
        
        // Lấy các câu hỏi đã chọn từ arrayQuestion
        const selectedQuestions = quiz.selectedQuestions.map(questionId => {
            console.log(questionId);
            
            // Tìm câu hỏi tương ứng trong arrayQuestion
            const question = quiz.questionFile.arrayQuestion.find(q => {
                // Kiểm tra nếu q tồn tại trước khi gọi .equals()
                return q && q._id.equals(questionId); // Sử dụng .equals để so sánh ObjectId
            });

            // Nếu không tìm thấy câu hỏi, trả về null
            if (!question) {
                console.log('Question not found for questionId:', questionId);
                return null;
            }

            // Nếu tìm thấy, format lại dữ liệu của câu hỏi
            return {
                questId: question._id,
                content: question.content,
                type: question.type,
                answers: question.answers.map(answer => ({
                    answerId: answer._id,
                    text: answer.answerContent
                })),
                correctAnswers: question.answers
                    .map((answer, index) => (answer.isCorrect ? index + 1 : null))
                    .filter(Boolean) 
            };
        }).filter(Boolean) ;// Lọc ra các câu hỏi không tồn tại (nếu có)

        // Format dữ liệu trả về
        const quizData = {
            id: quiz._id,
            name: quiz.quizName,
            duration: quiz.duration,
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