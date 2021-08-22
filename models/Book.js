const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    }, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{message: String, date: Date}],
    date: {type: Date, default: Date.now},
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: {type: Date, default: Date.now},
    meta: {
        votes: Number,
        favs: Number
    }
});
module.exports = mongoose.model('book', bookSchema);
