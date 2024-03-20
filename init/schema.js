const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;