const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
    userName : {type: String},
    toDoSubject : {type: String},
    toDoDescription : {type: String},
    toDoStatus : {type: String, default:"new"},
    toDoCreateDate : {type: String, default:Date.now},
    toDoUpdateDate : {type: String, default:Date.now}
},
{versionKey: false
});
const ToDoModel = mongoose.model('todolists', ToDoSchema)
module.exports = ToDoModel;