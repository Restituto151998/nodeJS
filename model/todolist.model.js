const mongoose = require('mongoose');
const Schema = mongoose.Schema; //refers to the mongoose schema or the structure of the document

//
const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true }
});

var Todo = mongoose.model('todos', todoSchema);
module.exports = Todo;