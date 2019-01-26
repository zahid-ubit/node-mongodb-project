var {ObjectID} =require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
var id='5c49fd3e93601330e0b55877';

  if(!ObjectID.isValid(id)){
    return console.log('invalid id supplied');
  }
Todo.findById(id).then((todos)=>{
  console.log(todos);
},(e)=>{
    console.log(e);
});