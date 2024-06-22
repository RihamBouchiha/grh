const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const ToDoModel = mongoose.model('ToDo', todoSchema);

module.exports = ToDoModel;
