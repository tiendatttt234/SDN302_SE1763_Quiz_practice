const fs = require("fs");
const path = require("path");
const QuestionFile = require("../models/QuestionFile.model");
const httpError = require("http-errors");


const uploadQuestions = async (req, res, next) => {
  try {
    console.log("Received file upload request...");
    const file = req.files.file; 
    if (!file) {
      throw new Error("No file uploaded");
      
    }
    const fileType = path.extname(file.name).toLowerCase();
    if (fileType !== ".txt") {
      return res.status(400).json({ error: "Invalid file format. Only .txt files are allowed." });
    }
    const fileContent = file.data.toString('utf-8');
    const questions = [];
    const lines = fileContent.split('\n');
    let currentQuestion = null;

    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('Q:')) {
        if (currentQuestion) questions.push(currentQuestion);
        currentQuestion = {
          content: line.substring(2).trim(),
          type: 'MCQ',
          answers: []
        };
      } else if (line.startsWith('A:')) {      
        const isCorrect = line.endsWith('(correct)');
        currentQuestion.answers.push({
          answerContent: line.replace('(correct)', '').substring(2).trim(),
          isCorrect
        });
      }
    });
    if (currentQuestion) questions.push(currentQuestion);
    if (questions.length === 0) throw new Error("No questions parsed from the file");
    const questionFile = new QuestionFile({
      name: req.body.name || "Uploaded Question Bank",
      description: req.body.description || "",
      createdBy: req.body.createdBy || null,
      arrayQuestion: questions
    });

    await questionFile.save();
    console.log("Saved question file successfully:", questionFile);

   
    res.json({
      message: "Questions uploaded and saved successfully",
      questionFile
    });

  } catch (error) {
    console.error("Error during file processing:", error.message);
    next(httpError(500, "Failed to process the uploaded file"));
  }
};


const listQuestions = async (req, res, next) => {
  try {
    const questionFiles = await QuestionFile.find({
      isPrivate: false,
    }).populate("createdBy", "userName email");
    res.json({ message: "List of question files", questionFiles });
  } catch (error) {
    console.error("Error fetching question files:", error.message);
    next(httpError(500, "Failed to fetch question files"));
  }
};

module.exports = { uploadQuestions, listQuestions };