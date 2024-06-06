const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const ToDoModel = mongoose.model('ToDo', todoSchema);

module.exports = ToDoModel;
