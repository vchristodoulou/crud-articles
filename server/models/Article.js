const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    description: {
        type: String
    }
}, {
    collection: 'articles'
})

const articlesWithContent = {
    _id: true,
    title: true,
    content: true,
    description: true
}

const articlesNoContent = {
    _id: true,
    title: true,
    description: true
}

module.exports = {
    articleModel: mongoose.model('Article', articlesSchema),
    articlesWithContent: articlesWithContent,
    articlesNoContent: articlesNoContent
}
