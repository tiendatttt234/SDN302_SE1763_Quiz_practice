const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "Account",
        required: true
    },
    questionFile: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "QuestionFile"
        }
    ]
},{
    timestamps: true
})

const Favorite = mongoose.model("Favorite", FavoritesSchema);
module.exports = Favorite;