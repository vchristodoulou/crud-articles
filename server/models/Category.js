const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categoriesSchema = new Schema({
    name: {
        type: String,
        unique: true
    }
}, {
    collection: 'categories'
})

module.exports = {
    categoryModel: mongoose.model('Category', categoriesSchema),
}
