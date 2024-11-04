const mongoose = require('mongoose');
const Account = require('./Account.model');
const Blog = require('./Blog.model');
const Favorite = require('./Favorites.model');
const QuesionFile = require('./QuestionFile.model');
const Quiz = require('./Quiz.model');
const QuizResult = require('./QuizResult.model');
const Role = require('./Role.model');

//khai bao doi tuong CSDL
const Db = {};
Db.Account = Account;
Db.Blog = Blog;
Db.Favorite = Favorite;
Db.QuesionFile = QuesionFile;
Db.Quiz = Quiz;
Db.QuizResult = QuizResult;
Db.Role = Role;

Db.connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("connect to mongodb success"))
    } catch (error) {
        next(error);
        process.exit();
    }
}

module.exports = Db;