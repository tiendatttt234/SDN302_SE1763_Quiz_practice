const QuestionFile = require("../models/QuestionFile.model");

async function getAllQuestionFile(req, res, next) {
    try {
        const listQuestionFile = await QuestionFile.find({});
        return res.status(200).json({ listQuestionFile });
    } catch (error) {
        next(error);
    }
}

async function createQuestionFile(req, res, next) {
    try {
        const { name, description, isPrivate, arrayQuestion, createdBy } = req.body;

        // Create a new QuestionFile instance
        const newQuestionFile = new QuestionFile({
            name,
            description,
            isPrivate,
            arrayQuestion,
            createdBy
        });

        // Save the question file to the database
        const savedQuestionFile = await newQuestionFile.save();

        return res.status(201).json({ message: "Question file created successfully", questionFile: savedQuestionFile });
    } catch (error) {
        next(error);
    }
}
async function getQuestionFileById(req, res, next) {
    try {
        const { id } = req.params;

        // Lấy questionFile theo ID
        const questionFile = await QuestionFile.findById(id);

        // Định dạng dữ liệu trả về
        const formattedResult = {
            name: questionFile.name,
            isPrivate: questionFile.isPrivate,
            arrayQuestion: questionFile.arrayQuestion.map(question => ({
                questionId: question._id,
                content: question.content,
                type: question.type,
                answers: question.answers.map(answer => ({
                    answerId: answer._id,
                    answerContent: answer.answerContent,
                    isCorrect: answer.isCorrect
                }))
            }))
        };

        return res.status(200).json({ questionFile: formattedResult });
    } catch (error) {
        next(error);
    }
}

const QuestionFileController = {
    getAllQuestionFile,
    getQuestionFileById,
    createQuestionFile
};

module.exports = QuestionFileController;