const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    content: {
        type: String
    },
    description: {
        type: String
    },
    category_name: {
        type: String
    }
}, {
    collection: 'articles'
})

const articlesWithContent = {
    _id: true,
    title: true,
    content: true,
    description: true,
    category_name: true
}

const articlesNoContent = {
    _id: true,
    title: true,
    description: true,
    category_name: true
}

module.exports = {
    articleModel: mongoose.model('Article', articlesSchema),
    articlesWithContent: articlesWithContent,
    articlesNoContent: articlesNoContent
}
