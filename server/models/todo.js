
var mongoose = require('mongoose');
var Schema =mongoose.Schema;

var TodoSchema= new Schema({
    text:{
        type: String,
        required:true,
        minlength:3
    }
    ,
    completed:{
        type: Boolean,
        default:false
    }
    ,
    completedAt:{
        type:Number,
        default:123
    }
});

var Todo = mongoose.model('Todo',TodoSchema);

 module.exports={Todo:Todo};